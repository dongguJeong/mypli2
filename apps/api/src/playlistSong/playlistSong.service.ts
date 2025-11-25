import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { Repository } from 'typeorm';
import { AddPlaylistSong } from './dto/addPlaylistSong.dto';
import { Playlist } from 'src/playlist/entity/playlist.entity';
@Injectable()
export class PlaylistSongService {
  constructor(
    @InjectRepository(PlaylistSong)
    private playlistSongRepo: Repository<PlaylistSong>,

    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,
  ) {}

  async addSong(dto: AddPlaylistSong, userId: number) {
    const playlist = await this.playlistRepo.findOne({
      where: { id: dto.playlistId },
      relations: ['owner'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    if (playlist.owner.id !== userId) throw new UnauthorizedException();

    const newPlaylistSong = this.playlistSongRepo.create({
      ...dto,
      playlist: { id: dto.playlistId },
    });

    this.playlistSongRepo.save(newPlaylistSong);

    const firstSong = await this.playlistSongRepo.findOne({
      where: { playlist: { id: dto.playlistId } },
      order: { orderIndex: 'ASC' },
    });

    if (firstSong) {
      playlist.thumbnailUrl = firstSong.songThumnail;
      await this.playlistRepo.save(playlist);
    }
    return { id: playlist.id, songId: newPlaylistSong.id };
  }

  async deleteSong(songId: number, userId: number) {
    const song = await this.playlistSongRepo.findOne({
      where: { id: songId },
      relations: ['playlist', 'playlist.owner'],
    });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    if (song.playlist.owner.id !== userId) throw new UnauthorizedException();

    this.playlistSongRepo.delete({ id: songId });
    return { songId: songId };
  }
}
