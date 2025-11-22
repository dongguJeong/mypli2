import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => Users, (user) => user.playlists, { onDelete: 'CASCADE' })
  owner: Users;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 500, nullable: true })
  detail: string;

  @Column({ length: 255, nullable: true, name: 'thumname_url' })
  thumbnailUrl: string;

  @Column({ type: 'boolean', name: 'is_public', default: true })
  isPublic: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.playlist, {
    cascade: true,
  })
  songs: PlaylistSong[];

  @OneToMany(() => PlaylistLike, (playlistLike) => playlistLike.playlist, {
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
}
