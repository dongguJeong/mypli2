import { Song } from 'src/song/entity/song.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('report')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Song, (song) => song.reports)
  song: Song;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
