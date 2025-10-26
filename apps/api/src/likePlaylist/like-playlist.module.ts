import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePlaylist } from './entity/like-playlist.entity';
import { LikePlaylistService } from './like-playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikePlaylist])],
  providers: [LikePlaylistService],
})
export class LikePlaylistModule {}
