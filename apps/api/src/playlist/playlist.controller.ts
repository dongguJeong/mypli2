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
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
  AddSongToPlaylistDto,
  SortPlaylistDto,
} from './dto/playlist.dto';
import { PlaylistService } from './playlist.service';
import type { Session as ExpressSession } from 'express-session';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() dto: CreatePlaylistDto, @Session() session: ExpressSession) {
    return this.playlistService.create(dto, +session.id);
  }

  @Get()
  listMine(@Session() session: ExpressSession) {
    return this.playlistService.listMine(+session.id);
  }

  @Get(':id')
  detail(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.detail(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlaylistDto,
    @Session() session: ExpressSession,
  ) {
    return this.playlistService.update(id, dto, +session.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: ExpressSession,
  ) {
    return this.playlistService.remove(id, +session.id);
  }

  @Post(':id/songs')
  async addSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddSongToPlaylistDto,
  ) {
    if (dto.songId) {
      return this.playlistService.addExistingSong(id, dto.songId);
    }
    if (dto.source === 'youtube' && dto.videoId) {
      await this.playlistService.enqueueIngestFromYouTube(id, dto.videoId);
      return { status: 'accepted' };
    }
    throw new Error('Invalid payload');
  }

  @Patch(':id/sort')
  sort(@Param('id', ParseIntPipe) id: number, @Body() dto: SortPlaylistDto) {
    return this.playlistService.sort(id, dto.orderedPlaylistSongIds);
  }

  @Get('mostLiked')
  mostLiked() {
    return this.playlistService.mostLiked();
  }

  @Get('newes')
  newest() {
    return this.playlistService.newest();
  }
}
