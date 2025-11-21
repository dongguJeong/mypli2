import { Module } from '@nestjs/common';
import { searchController } from './search.controller';

@Module({
  imports: [],
  controllers: [searchController],
})
export class SearchModule {}
