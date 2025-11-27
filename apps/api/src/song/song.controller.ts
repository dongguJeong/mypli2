import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { NormalizeYoutubeVideoDto } from './dto/normalize-youtubeVideo';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post('normalize')
  normalizeYoutubeVideo(@Body() dto: NormalizeYoutubeVideoDto) {
    return this.songService.normalizeYoutubeVideo(dto);
  }

  @Post()
  createSong(@Body() dto: CreateSongDto) {
    const song = this.songService.createSong(dto);
    return {
      message: '추가',
      song,
    };
  }

  // Todo : admin 계정만 삭제 가능
  @Delete()
  deleteSong(@Param('id') id: number) {
    this.songService.deleteSong(id);
    return {
      message: '삭제',
      id,
    };
  }
}
