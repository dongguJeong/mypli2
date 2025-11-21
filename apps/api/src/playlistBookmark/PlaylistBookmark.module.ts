import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistBookmark } from './entity/playlistBookmark.entity';
import { PlaylistBookmarkService } from './PlaylistBookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistBookmark])],
  providers: [PlaylistBookmarkService],
})
export class PlaylistBookmarkModule {}
