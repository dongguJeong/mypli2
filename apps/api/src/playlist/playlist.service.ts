// apps/api/src/modules/playlists/playlists.service.ts (중요 부분만)
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entity/playlist.entity';
import { Song } from 'src/song/song.entity';
import { PlaylistSong } from 'src/playlist-song/entity/playlist-song.entity';
import { PipelineQueue } from 'src/queue/pipeline.queue';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private playlist: Repository<Playlist>,
    @InjectRepository(Song) private songs: Repository<Song>,
    @InjectRepository(PlaylistSong) private ps: Repository<PlaylistSong>,
    private readonly pipeline: PipelineQueue,
  ) {}

  create(dto: { name: string; description?: string }, userId: number) {
    const playlist = this.playlist.create({ ...dto, owner: { id: userId } });
    return this.playlist.save(playlist);
  }

  listMine(userId: number) {
    return this.playlist.find({
      where: { owner: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  async detail(id: number) {
    const playlist = await this.playlist.findOne({
      where: { id },
      relations: ['songs', 'songs.song', 'owner'],
      order: { songs: { position: 'ASC' } },
    });

    if (!playlist) throw new NotFoundException('Playlist not found');

    return playlist;
  }

  async update(id: number, dto: Partial<Playlist>, userId: number) {
    const playlist = await this.playlist.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!playlist) throw new NotFoundException('Playlist not found');
    if (playlist.owner.id !== userId)
      throw new ForbiddenException('You cannot edit this playlist');

    Object.assign(playlist, dto);
    return this.playlist.save(playlist);
  }

  async remove(id: number, userId: number) {
    const playlist = await this.playlist.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!playlist) throw new NotFoundException('Playlist not found');
    if (playlist.owner.id !== userId)
      throw new ForbiddenException('You cannot delete this playlist');

    await this.playlist.remove(playlist);
    return { ok: true };
  }

  async addExistingSong(playlistId: number, songId: number) {
    const playlist = await this.playlist.findOneByOrFail({ id: playlistId });
    const song = await this.songs.findOneByOrFail({ id: songId });
    const item = this.ps.create({ playlist, song, position: Date.now() });
    return this.ps.save(item);
  }

  async enqueueIngestFromYouTube(playlistId: number, videoId: string) {
    await this.pipeline.enqueue({ playlistId, videoId });
  }

  async sort(playlistId: number, orderedIds: number[]) {
    // orderedIds: playlist_songs.id 배열 → position 0..N-1로 업데이트
    await Promise.all(
      orderedIds.map((id, idx) => this.ps.update({ id }, { position: idx })),
    );
    return { ok: true };
  }

  newest() {
    return this.playlist.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }

  async mostLiked() {
    const result = await this.playlist
      .createQueryBuilder('playlist')
      .leftJoin('playlist.likes', 'like')
      .loadRelationCountAndMap('playlist.likeCount', 'playlist.likes')
      .orderBy('likeCount', 'DESC')
      .addOrderBy('playlist.id', 'DESC') // 동점일 경우 최신순
      .take(5)
      .getMany();

    return result;
  }
}
