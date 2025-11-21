import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistBookmark } from './entity/playlistBookmark.entity';

@Injectable()
export class PlaylistBookmarkService {
  constructor(
    @InjectRepository(PlaylistBookmark)
    private playlistBookmark: Repository<PlaylistBookmark>,
  ) {}

  create(playlistId: number, userId: number) {
    const bookmark = this.playlistBookmark.create({
      playlistId,
      userId,
    });
    this.playlistBookmark.save(bookmark);
  }

  delete(playlistId: number, userId: number) {
    return this.playlistBookmark.delete({ playlistId, userId });
  }
}
