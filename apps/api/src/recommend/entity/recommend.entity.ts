import { Song } from 'src/song/entity/song.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recommend')
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.recommends)
  user: Users;

  @ManyToOne(() => Song, (song) => song.recommends)
  song: Song;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
