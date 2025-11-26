import { Playlist } from 'src/playlist/entity/playlist.entity';
import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { Recommend } from 'src/recommend/entity/recommend.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255, name: 'password_hash' })
  passwordHash: string;

  @Column({ length: 255, nullable: true, name: 'profile_image' })
  profileImage: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createdAt',
  })
  created_at: Date;

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];

  @OneToMany(() => PlaylistLike, (playlistLike) => playlistLike.user, {
    cascade: true,
  })
  likes: PlaylistLike[];

  @OneToMany(
    () => PlaylistBookmark,
    (playlistBookmark) => playlistBookmark.playlist,
    {
      cascade: true,
    },
  )
  bookmarks: PlaylistBookmark[];

  @OneToMany(() => Recommend, (recommend) => recommend.song, { cascade: true })
  recommends: Recommend[];
}
