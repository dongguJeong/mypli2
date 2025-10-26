import { LikePlaylist } from 'src/likePlaylist/entity/like-playlist.entity';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Playlist, (p) => p.owner)
  playlists: Playlist[];

  @OneToMany(() => LikePlaylist, (l) => l.user)
  likes: LikePlaylist[];
}
