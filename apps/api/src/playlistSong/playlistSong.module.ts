import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { PlaylistSongService } from './playlistSong.service';
import { PlaylistSongController } from './playlistSong.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Playlist } from 'src/playlist/entity/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistSong, Playlist]), AuthModule],
  controllers: [PlaylistSongController],
  providers: [PlaylistSongService],
})
export class PlaylistSongModule {}
