import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlaylistSongService } from './playlistSong.service';
import { AddPlaylistSong } from './dto/addPlaylistSong.dto';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';

@Controller('song')
@UseGuards(SessionGuard)
export class PlaylistSongController {
  constructor(private readonly playlistSongService: PlaylistSongService) {}

  @Post()
  addSong(@Body() addSongdto: AddPlaylistSong, @CurrentUser() userId: number) {
    return this.playlistSongService.addSong(addSongdto, userId);
  }

  @Delete()
  deleteSong(
    @Query('songId', ParseIntPipe) songId: number,
    @CurrentUser() userId: number,
  ) {
    return this.playlistSongService.deleteSong(songId, userId);
  }
}
