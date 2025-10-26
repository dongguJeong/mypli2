import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikePlaylist } from './entity/like-playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikePlaylistService {
  constructor(
    @InjectRepository(LikePlaylist)
    private readonly likePlaylist: Repository<LikePlaylist>,
  ) {}

  like(playlistId: number, userId: number) {
    const like = this.likePlaylist.create({
      user: { id: userId },
      playlist: { id: playlistId },
    });

    return this.likePlaylist.save(like);
  }

  unlike(playlistId: number, userId: number) {
    return this.likePlaylist.delete({
      user: { id: userId },
      playlist: { id: playlistId },
    });
  }

  hasUserLiked(playlistId: number, userId: number) {
    return this.likePlaylist.exists({
      where: { user: { id: userId }, playlist: { id: playlistId } },
    });
  }
}
