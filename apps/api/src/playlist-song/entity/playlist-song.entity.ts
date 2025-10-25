import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Song } from 'src/song/song.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

@Entity('playlist_song')
@Index(['playlist', 'position'])
export class PlaylistSong {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Playlist, (p) => p.id, { onDelete: 'CASCADE' })
  playlist: Playlist;

  @ManyToOne(() => Song, (s) => s.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  song: Song;

  @Column({ type: 'int', default: 0 })
  position: number;
}
