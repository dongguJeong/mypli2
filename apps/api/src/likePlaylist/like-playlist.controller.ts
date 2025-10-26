import { Controller, Delete, Get, Param, Session } from '@nestjs/common';
import type { Session as ExpressSession } from 'express-session';
import { LikePlaylistService } from './like-playlist.service';

@Controller('like')
export class LikePlaylistController {
  constructor(private readonly likePlaylistService: LikePlaylistService) {}

  @Get(':playlistId/like')
  like(
    @Param('playlistId') playlistId: number,
    @Session() session: ExpressSession,
  ) {
    return this.likePlaylistService.like(playlistId, +session.id);
  }

  @Delete(':playlistId/like')
  unlike(
    @Param('playlistId') playlistId: number,
    @Session() session: ExpressSession,
  ) {
    return this.likePlaylistService.unlike(playlistId, +session.id);
  }
}
