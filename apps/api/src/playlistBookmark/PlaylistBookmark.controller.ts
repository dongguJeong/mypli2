import {
  Controller,
  Delete,
  Get,
  Param,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { PlaylistBookmarkService } from './PlaylistBookmark.service';
import type { Session as ExpressSession } from 'express-session';
import { ParseIntPipe } from '@nestjs/common';

@Controller('bookmark')
export class PlaylistBookmarkController {
  constructor(
    private readonly playlistBookmarkService: PlaylistBookmarkService,
  ) {}

  @Get(':playlistId')
  addBookmark(
    @Session() session: ExpressSession,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    const userId = session.userId;
    if (!userId) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
    this.playlistBookmarkService.create(playlistId, userId);
    return { message: '북마크 추가', playlistId };
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
    this.playlistBookmarkService.delete(playlistId, userId);
    return { message: '북마크 삭제', playlistId };
  }
}
