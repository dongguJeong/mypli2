import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/playlist.module';
import { Users } from './users/entity/users.entity';
import { Playlist } from './playlist/entity/playlist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistSong } from './playlistSong/entity/playlistSong.entity';
import { PlaylistBookmark } from './playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistBookmarkModule } from './playlistBookmark/PlaylistBookmark.module';
import { PlaylistLikeModule } from './playlistLike/PlaylistLike.module';
import { PlaylistSongModule } from './playlistSong/playlistSong.module';
import { PlaylistLike } from './playlistLike/entity/playlistLike.entity';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Users, Playlist, PlaylistSong, PlaylistBookmark, PlaylistLike],
      synchronize: true, // 개발 중에는 true (운영 시 false)
    }),
    AuthModule,
    PlaylistModule,
    PlaylistBookmarkModule,
    PlaylistLikeModule,
    PlaylistSongModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
