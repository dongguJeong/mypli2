import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './entity/playlistSong.entity';
import { PlaylistSongService } from './playlistSong.service';
import { PlaylistSongController } from './playlistSong.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Song } from 'src/song/entity/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistSong, Playlist, Song]),
    AuthModule,
  ],
  controllers: [PlaylistSongController],
  providers: [PlaylistSongService],
})
export class PlaylistSongModule {}
