import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchTrackDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('tracks')
  async search(@Query() dto: SearchTrackDto) {
    const [dbHits, ytHits] = await Promise.all([
      this.searchService.searchDb(dto.q, dto.limit),
      this.searchService.searchYouTube(dto.q, dto.limit),
    ]);

    const combined = this.searchService.combineDedup(dbHits, ytHits);
    return { combined };
  }
}
