import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
