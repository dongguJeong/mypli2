import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class searchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('youtube')
  async searchYoutube(@Query('q') q: string) {
    if (!q?.trim()) {
      throw new BadRequestException('검색어 q는 필수입니다.');
    }
    return this.searchService.searchYoutube(q);
  }

  @Get('playlist')
  async searchPlaylist(@Query('q') q: string) {
    if (!q?.trim()) {
      throw new BadRequestException('검색어 q는 필수입니다.');
    }
    return this.searchService.searchPlaylist(q);
  }

  @Get('songRepo')
  async searchSongRepo(@Query('q') q: string) {
    if (!q?.trim()) {
      throw new BadRequestException('검색어 q는 필수입니다.');
    }
    return this.searchService.searchSongRepo(q);
  }
}
