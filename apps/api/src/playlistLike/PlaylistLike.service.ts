import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistLike } from './entity/playlistLike.entity';

@Injectable()
export class PlaylistLikeService {
  constructor(
    @InjectRepository(PlaylistLike)
    private playlistLike: Repository<PlaylistLike>,
  ) {}

  create(playlistId: number, userId: number) {
    const like = this.playlistLike.create({
      playlistId,
      userId,
    });
    this.playlistLike.save(like);
  }

  delete(playlistId: number, userId: number) {
    return this.playlistLike.delete({ playlistId, userId });
  }
}
