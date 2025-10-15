import { Song } from 'src/song/entity/song.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Song, (song) => song.playlist, { cascade: true })
  songs: Song[];
}
