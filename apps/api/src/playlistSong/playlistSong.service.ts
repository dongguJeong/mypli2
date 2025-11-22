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
import { DeletePlaylistSong } from './dto/deletePlaylistSong.dto';

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

    return this.playlistSongRepo.save(newPlaylistSong);
  }

  async deleteSong(dto: DeletePlaylistSong, userId: number) {
    const playlist = await this.playlistRepo.findOne({
      where: { id: dto.songId },
      relations: ['owner'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    if (playlist.owner.id !== userId) throw new UnauthorizedException();

    return this.playlistSongRepo.delete({ id: dto.songId });
  }
}
