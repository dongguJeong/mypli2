import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { PlaylistModule } from './playlist/Playlist.module';
import { LikePlaylistModule } from './likePlaylist/like-playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true, // 개발 중에는 true (운영 시 false)
    }),
    AuthModule,
    SearchModule,
    PlaylistModule,
    LikePlaylistModule,
  ],
})
export class AppModule {}
