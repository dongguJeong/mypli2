import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlaylistBookmarkService } from './PlaylistBookmark.service';
import { ParseIntPipe } from '@nestjs/common';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';

@Controller('bookmark')
@UseGuards(SessionGuard)
export class PlaylistBookmarkController {
  constructor(
    private readonly playlistBookmarkService: PlaylistBookmarkService,
  ) {}

  @Get('list')
  getBookmark(@CurrentUser() userId: number) {
    return this.playlistBookmarkService.getBookmarkList(userId);
  }

  @Post(':playlistId')
  addBookmark(
    @CurrentUser() userId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    this.playlistBookmarkService.create(playlistId, userId);
    return { message: '북마크 추가', playlistId };
  }

  @Delete(':playlistId')
  deleteBookmark(
    @CurrentUser() userId: number,
    @Param('playlistId', ParseIntPipe) playlistId: number,
  ) {
    this.playlistBookmarkService.delete(playlistId, userId);
    return { message: '북마크 삭제', playlistId };
  }
}
