import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistLike } from './entity/playlistLike.entity';
import { PlaylistLikeService } from './PlaylistLike.service';
import { PlaylistLikeController } from './PlaylistLike.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistLike])],
  controllers: [PlaylistLikeController],
  providers: [PlaylistLikeService],
})
export class PlaylistLikeModule {}
