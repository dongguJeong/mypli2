import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { PlaylistSongService } from './playlistSong.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistSong])],
  providers: [PlaylistSongService],
})
export class PlaylistSongModule {}
