import {
  Controller,
  Delete,
  Get,
  Param,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { PlaylistLikeService } from './PlaylistLike.service';
import type { Session as ExpressSession } from 'express-session';
import { ParseIntPipe } from '@nestjs/common';

@Controller('like')
export class PlaylistLikeController {
  constructor(private readonly playlistLikeService: PlaylistLikeService) {}

  @Get(':playlistId')
  addBookmark(
    @Session() session: ExpressSession,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    const userId = session.userId;
    if (!userId) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
    this.playlistLikeService.create(playlistId, userId);
    return { message: '좋아요 추가', playlistId };
  }

  @Delete(':playlistId')
  deleteBookmark(
    @Session() session: ExpressSession,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    const userId = session.userId;
    if (!userId) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
    this.playlistLikeService.delete(playlistId, userId);
    return { message: '좋아요 삭제', playlistId };
  }
}
