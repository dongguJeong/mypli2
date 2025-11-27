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
        { thumbnailUrl: song?.songThumnail },
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

    await this.playlistSongRepo.delete({
      song: { id: dto.songId },
      playlist: { id: dto.playlistId },
    });

    return { message: 'Song deleted successfully' };
  }
}
