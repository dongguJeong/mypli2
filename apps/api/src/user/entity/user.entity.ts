import { Playlist } from 'src/playlist/entity/playlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  profile: string | null;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
