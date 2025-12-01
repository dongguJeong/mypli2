import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { Repository } from 'typeorm';
import { AddPlaylistSong } from './dto/add-playlistSong.dto';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { DeletePlaylistSongParamsDto } from './dto/delete-PlaylistSong.dto';
import { Song } from 'src/song/entity/song.entity';
@Injectable()
export class PlaylistSongService {
  constructor(
    @InjectRepository(PlaylistSong)
    private playlistSongRepo: Repository<PlaylistSong>,

    @InjectRepository(Playlist)
    private playlistRepo: Repository<Playlist>,

    @InjectRepository(Song)
    private songRepo: Repository<Song>,
  ) {}

  async addPlaylistSong(dto: AddPlaylistSong, userId: number) {
    const playlist = await this.playlistRepo.findOne({
      where: { id: dto.playlistId },
      relations: ['owner'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    if (playlist.owner.id !== userId) throw new UnauthorizedException();
    if (!dto.songId) throw new UnauthorizedException();

    const currentSongCount = await this.playlistSongRepo.count({
      where: { playlist: { id: dto.playlistId } },
    });

    const newPlaylistSong = this.playlistSongRepo.create({
      song: { id: dto.songId },
      playlist: { id: dto.playlistId },
    });

    await this.playlistSongRepo.save(newPlaylistSong);

    if (currentSongCount === 0) {
      const song = await this.songRepo.findOne({
        where: { id: dto.songId },
      });

      await this.playlistRepo.update(
        { id: dto.playlistId },
        { thumbnailUrl: song?.songThumbnail },
      );
    }

    return { id: playlist.id, songId: newPlaylistSong.id };
  }

  async deletePlaylistSong(dto: DeletePlaylistSongParamsDto, userId: number) {
    const playlistSong = await this.playlistSongRepo.findOne({
      where: {
        song: { id: dto.songId },
        playlist: { id: dto.playlistId },
      },
      relations: ['playlist', 'playlist.owner'],
    });

    if (!playlistSong) {
      throw new NotFoundException('Song not found in playlist');
    }

    if (playlistSong.playlist.owner.id !== userId) {
      throw new UnauthorizedException('You are not the owner of this playlist');
    }

    // 삭제하려는 곡의 이미지가 플레이리스트의 이미지인 경우 , 해당 플레이리스트의 다른 이미지로 대체
    // 그래도 이미자가 없다 -> null 저장

    const playlist = playlistSong.playlist;
    const deletingSongThumbnail = playlistSong.song.songThumbnail;
    const needsNewThumbnail = playlist.thumbnailUrl === deletingSongThumbnail;

    await this.playlistSongRepo.delete({
      song: { id: dto.songId },
      playlist: { id: dto.playlistId },
    });

    if (needsNewThumbnail) {
      const remainingSongs = await this.playlistSongRepo.find({
        where: { playlist: { id: dto.playlistId } },
        relations: ['song'],
        take: 1, // 첫 번째 곡만 가져오기
      });

      // 남은 곡이 있으면 첫 번째 곡의 썸네일 사용, 없으면 null
      const newThumbnail =
        remainingSongs.length > 0
          ? remainingSongs[0].song.songThumbnail
          : undefined;

      await this.playlistRepo.update(
        { id: dto.playlistId },
        { thumbnailUrl: newThumbnail },
      );
    }

    return { message: 'Song deleted successfully' };
  }
}
