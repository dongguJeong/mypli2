import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/Playlist.module';
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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { ReportModule } from './report/report.module';
import { RecommendModule } from './recommend/recommend.module';
import { Report } from './report/entity/report.entity';
import { Song } from './song/entity/song.entity';
import { Recommend } from './recommend/entity/recommend.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: 3306,
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [
          Users,
          Playlist,
          PlaylistSong,
          PlaylistBookmark,
          PlaylistLike,
          Recommend,
          Report,
          Song,
        ],
        synchronize: true, // 개발 중에는 true (운영 시 false)
        charset: 'utf8mb4',
      }),
    }),
    AuthModule,
    PlaylistModule,
    PlaylistBookmarkModule,
    PlaylistLikeModule,
    PlaylistSongModule,
    SearchModule,
    SongModule,
    ReportModule,
    RecommendModule,
  ],
})
export class AppModule {}
