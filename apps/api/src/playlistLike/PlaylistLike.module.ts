import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistLike } from './entity/playlistLike.entity';
import { PlaylistLikeService } from './PlaylistLike.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistLike])],
  providers: [PlaylistLikeService],
})
export class PlaylistLikeModule {}
