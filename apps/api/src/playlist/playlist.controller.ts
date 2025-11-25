import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';
import { UpdatePlaylistDto } from './dto/update.dto';
import type { Session as ExpressSession } from 'express-session';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  // === GET 라우트들 (정적 → 동적 순서) ===
  @Get('myplaylist')
  getMyplaylist(@CurrentUser('id', ParseIntPipe) userId: number) {
    return this.playlistService.listMine(userId);
  }

  @Get('mostLiked')
  getMostLike() {
    return this.playlistService.getMostLikedPlaylist(3);
  }

  @Get('newest')
  getNewest() {
    return this.playlistService.getNewest(5);
  }

  @Get(':playlistId')
  getDetail(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Session() session: ExpressSession,
  ) {
    const userId = session?.userId ?? null;
    return this.playlistService.getDetail(playlistId, userId);
  }

  // === POST 라우트 (순서 무관) ===
  @Post()
  createPlaylist(@CurrentUser(ParseIntPipe) userId: number) {
    return this.playlistService.create(userId);
  }

  // === PATCH 라우트 (순서 무관) ===
  @Patch(':playlistId')
  updatePlaylist(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @CurrentUser('id', ParseIntPipe) userId: number,
  ) {
    return this.playlistService.update(playlistId, userId, updatePlaylistDto);
  }

  // === DELETE 라우트 (순서 무관) ===
  @Delete(':playlistId')
  deletePlaylist(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @CurrentUser(ParseIntPipe) userId: number,
  ) {
    this.playlistService.delete(playlistId, userId);
  }
}
