import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistBookmark } from './entity/playlistBookmark.entity';
import { PlaylistBookmarkService } from './PlaylistBookmark.service';
import { PlaylistBookmarkController } from './PlaylistBookmark.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistBookmark])],
  controllers: [PlaylistBookmarkController],
  providers: [PlaylistBookmarkService],
})
export class PlaylistBookmarkModule {}
