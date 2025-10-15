import { Controller, Get, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller()
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search')
  async search(@Query('q') q: string) {
    return this.youtubeService.searchVideos(q);
  }
}
