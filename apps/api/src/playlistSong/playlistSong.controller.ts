import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlaylistSongService } from './playlistSong.service';
import { AddPlaylistSong } from './dto/add-playlistSong.dto';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';
import { DeletePlaylistSongParamsDto } from './dto/delete-PlaylistSong.dto';
import { SongService } from 'src/song/song.service';

@Controller('playlistSong')
@UseGuards(SessionGuard)
export class PlaylistSongController {
  constructor(
    private readonly playlistSongService: PlaylistSongService,
    private readonly songService: SongService,
  ) {}

  @Post()
  addPlaylistSong(
    @Body() addPlaylistSongdto: AddPlaylistSong,
    @CurrentUser() userId: number,
  ) {
    return this.playlistSongService.addPlaylistSong(addPlaylistSongdto, userId);
  }

  @Delete(':playlistId/songs/:songId')
  deletePlaylistSong(
    @Param() params: DeletePlaylistSongParamsDto,
    @CurrentUser() userId: number,
  ) {
    return this.playlistSongService.deletePlaylistSong(params, userId);
  }
}
