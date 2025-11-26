import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { PlaylistService } from './playlist.service';
import { AuthModule } from 'src/auth/auth.module';
import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { PlaylistController } from './playlist.controller';
import { Song } from 'src/song/entity/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Playlist,
      PlaylistBookmark,
      PlaylistSong,
      PlaylistLike,
      Song,
    ]),
    AuthModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
