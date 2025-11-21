import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Users } from 'src/users/entity/users.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('playlist_like')
export class PlaylistLike {
  @PrimaryColumn({ type: 'int', unsigned: true, name: 'playlist_id' })
  playlistId: number;

  @PrimaryColumn({ type: 'int', unsigned: true, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id', referencedColumnName: 'id' })
  playlist: Playlist;

  @ManyToOne(() => Users, (user) => user.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
