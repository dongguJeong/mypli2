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
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import type { Session as ExpressSession } from 'express-session';
import { SessionGuard } from 'src/auth/auth.guard';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

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
  @UseGuards(SessionGuard)
  getDetail(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Session() session: ExpressSession,
  ) {
    const userId = session?.userId ?? null;
    return this.playlistService.getDetail(playlistId, userId);
  }

  @Post()
  @UseGuards(SessionGuard)
  createPlaylist(@CurrentUser(ParseIntPipe) userId: number) {
    return this.playlistService.create(userId);
  }

  @Patch(':playlistId')
  @UseGuards(SessionGuard)
  updatePlaylist(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @CurrentUser('id', ParseIntPipe) userId: number,
  ) {
    return this.playlistService.update(playlistId, userId, updatePlaylistDto);
  }

  @Delete(':playlistId')
  @UseGuards(SessionGuard)
  deletePlaylist(
    @Param('playlistId', ParseIntPipe) playlistId: number,
    @CurrentUser(ParseIntPipe) userId: number,
  ) {
    this.playlistService.delete(playlistId, userId);
  }
}
