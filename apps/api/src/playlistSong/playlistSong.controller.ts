import { Body, Controller, Delete, Post } from '@nestjs/common';
import { PlaylistSongService } from './playlistSong.service';
import { AddPlaylistSong } from './dto/addPlaylistSong.dto';
import { DeletePlaylistSong } from './dto/deletePlaylistSong.dto';

@Controller('song')
export class PlaylistSongController {
  constructor(private readonly playlistSongService: PlaylistSongService) {}

  @Post()
  addSong(@Body() addSongdto: AddPlaylistSong) {
    this.playlistSongService.addSong(addSongdto);
  }

  @Delete()
  deleteSong(@Body() deleteSongdto: DeletePlaylistSong) {
    this.playlistSongService.deleteSong(deleteSongdto.songId);
  }
}
