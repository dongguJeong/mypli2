import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistLike } from './entity/playlistLike.entity';
import { PlaylistLikeService } from './PlaylistLike.service';
import { PlaylistLikeController } from './PlaylistLike.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistLike]), AuthModule],
  controllers: [PlaylistLikeController],
  providers: [PlaylistLikeService],
})
export class PlaylistLikeModule {}
