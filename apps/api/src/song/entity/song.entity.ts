import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: string;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}
