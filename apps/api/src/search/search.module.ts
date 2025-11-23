import { Module } from '@nestjs/common';
import { searchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [searchController],
  providers: [SearchService],
})
export class SearchModule {}
