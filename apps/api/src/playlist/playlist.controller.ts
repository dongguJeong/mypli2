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
import { CreatePlaylistDto } from './dto/create.dto';
import { UpdatePlaylistDto } from './dto/update.dto';
import type { Session as ExpressSession } from 'express-session';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Delete(':playlistId')
  deletePlaylist(
    @Param(ParseIntPipe) playlistId: number,
    @CurrentUser(ParseIntPipe) userId: number,
  ) {
    this.playlistService.delete(playlistId, userId);
  }

  @Post()
  createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @CurrentUser(ParseIntPipe) userId: number,
  ) {
    this.playlistService.create(createPlaylistDto, userId);
  }

  @Patch(':playlistId')
  updatePlaylist(
    @Param(':playlistId', ParseIntPipe) playlistId: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @CurrentUser('id', ParseIntPipe) userId: number,
  ) {
    return this.playlistService.update(playlistId, userId, updatePlaylistDto);
  }

  @Get('myplaylist')
  getMyplaylist(@CurrentUser('id', ParseIntPipe) userId: number) {
    return this.playlistService.listMine(userId);
  }

  @Get(':playlistId')
  getDetail(
    @Param(':playlistId', ParseIntPipe) playlistId: number,
    @Session() session: ExpressSession,
  ) {
    const userId = session?.userId ?? null;
    return this.playlistService.getDetail(playlistId, userId);
  }
}
