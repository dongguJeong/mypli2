import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { PlaylistSongService } from './playlistSong.service';
import { PlaylistSongController } from './playlistSong.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistSong])],
  controllers: [PlaylistSongController],
  providers: [PlaylistSongService],
})
export class PlaylistSongModule {}
