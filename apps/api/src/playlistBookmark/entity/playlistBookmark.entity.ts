import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Users } from 'src/users/entity/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('playlist_bookmark')
export class PlaylistBookmark {
  @PrimaryColumn({ type: 'int', unsigned: true, name: 'playlist_id' })
  playlistId: number;

  @PrimaryColumn({ type: 'int', unsigned: true, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: Playlist;

  @ManyToOne(() => Users, (user) => user.bookmarks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
