import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    return this.playlistService.listMine(+session.id); // auth user 기준
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.playlistService.detail(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePlaylistDto,
    @Session() session: ExpressSession,
  ) {
    return this.playlistService.update(+id, dto, +session.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session: ExpressSession) {
    return this.playlistService.remove(+id, +session.id);
  }

  @Post(':id/songs')
  async addSong(@Param('id') id: string, @Body() dto: AddSongToPlaylistDto) {
    if (dto.songId) {
      // 이미 분석된 곡(DB) 추가 → 즉시
      return this.playlistService.addExistingSong(+id, dto.songId);
    }
    if (dto.source === 'youtube' && dto.videoId) {
      // 파이프라인 트리거 → 비동기 큐(분석 후 자동 추가)
      await this.playlistService.enqueueIngestFromYouTube(+id, dto.videoId);
      return { status: 'accepted' };
    }
    throw new Error('Invalid payload');
  }

  @Patch(':id/sort')
  sort(@Param('id') id: string, @Body() dto: SortPlaylistDto) {
    return this.playlistService.sort(+id, dto.orderedPlaylistSongIds);
  }
}
