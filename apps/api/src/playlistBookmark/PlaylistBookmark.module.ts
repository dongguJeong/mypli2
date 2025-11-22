import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistBookmark } from './entity/playlistBookmark.entity';
import { PlaylistBookmarkService } from './PlaylistBookmark.service';
import { PlaylistBookmarkController } from './PlaylistBookmark.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistBookmark]), AuthModule],
  controllers: [PlaylistBookmarkController],
  providers: [PlaylistBookmarkService],
})
export class PlaylistBookmarkModule {}
