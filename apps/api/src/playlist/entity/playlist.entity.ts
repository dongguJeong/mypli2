import { PlaylistSong } from 'src/playlist-song/entity/playlist-song.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @OneToMany(() => PlaylistSong, (ps) => ps.playlist, { cascade: true })
  songs: PlaylistSong[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
