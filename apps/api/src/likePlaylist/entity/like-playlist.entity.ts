import { Playlist } from 'src/playlist/entity/playlist.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('like_playlist')
@Unique(['user', 'playlist'])
export class LikePlaylist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (u) => u.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Playlist, (p) => p.likes, { onDelete: 'CASCADE' })
  playlist: Playlist;
}
