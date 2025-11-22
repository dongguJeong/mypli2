import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { PlaylistLikeService } from './PlaylistLike.service';
import { ParseIntPipe } from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';

@Controller('like')
@UseGuards(SessionGuard)
export class PlaylistLikeController {
  constructor(private readonly playlistLikeService: PlaylistLikeService) {}

  @Get(':playlistId')
  addBookmark(
    @CurrentUser() userId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    this.playlistLikeService.create(playlistId, userId);
    return { message: '좋아요 추가', playlistId };
  }

  @Delete(':playlistId')
  deleteBookmark(
    @CurrentUser() userId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    this.playlistLikeService.delete(playlistId, userId);
    return { message: '좋아요 삭제', playlistId };
  }
}
