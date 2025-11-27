import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistBookmark } from './entity/playlistBookmark.entity';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';
import { Playlist } from 'src/playlist/entity/playlist.entity';

@Injectable()
export class PlaylistBookmarkService {
  constructor(
    @InjectRepository(PlaylistBookmark)
    private playlistBookmarkRepo: Repository<PlaylistBookmark>,
  ) {}

  async create(playlistId: number, userId: number) {
    const bookmark = this.playlistBookmarkRepo.create({
      playlistId,
      userId,
    });
    await this.playlistBookmarkRepo.save(bookmark);
  }

  async delete(playlistId: number, userId: number) {
    return await this.playlistBookmarkRepo.delete({ playlistId, userId });
  }

  async getBookmarkList(userId: number) {
    const bookmarks = await this.playlistBookmarkRepo.find({
      where: { userId },
      relations: ['playlist'],
      order: { playlist: { createdAt: 'DESC' } }, // 플레이리스트 생성일 기준
    });

    return bookmarks.map((v) => v.playlist);
  }
}
