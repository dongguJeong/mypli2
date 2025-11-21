import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { Repository } from 'typeorm';
import { AddPlaylistSong } from './dto/addPlaylistSong.dto';

@Injectable()
export class PlaylistSongService {
  constructor(
    @InjectRepository(PlaylistSong)
    private playlistSong: Repository<PlaylistSong>,
  ) {}

  addSong(dto: AddPlaylistSong) {
    const newPlaylistSong = this.playlistSong.create({
      ...dto,
      playlist: { id: dto.playlistId },
    });

    return this.playlistSong.save(newPlaylistSong);
  }

  deleteSong(songId: number) {
    return this.playlistSong.delete({ id: songId });
  }
}
