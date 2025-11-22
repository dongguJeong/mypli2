import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { PlaylistSongService } from './playlistSong.service';
import { AddPlaylistSong } from './dto/addPlaylistSong.dto';
import { DeletePlaylistSong } from './dto/deletePlaylistSong.dto';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';

@Controller('song')
@UseGuards(SessionGuard)
export class PlaylistSongController {
  constructor(private readonly playlistSongService: PlaylistSongService) {}

  @Post()
  addSong(@Body() addSongdto: AddPlaylistSong, @CurrentUser() userId: number) {
    this.playlistSongService.addSong(addSongdto, userId);
  }

  @Delete()
  deleteSong(
    @Body() deleteSongdto: DeletePlaylistSong,
    @CurrentUser() userId: number,
  ) {
    this.playlistSongService.deleteSong(deleteSongdto, userId);
  }
}
