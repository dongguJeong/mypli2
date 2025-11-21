import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class PlaylistSong {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs, {
    onDelete: 'CASCADE',
  })
  playlist: Playlist;

  @Column({ length: 500, name: 'youtube_url' })
  youtubeUrl: string;

  @Column({ length: 255 })
  singer: string;

  @Column({ length: 255, nullable: true, name: 'song_thumnail' })
  songThumnail: string;

  @Column({ name: 'order_index', default: 0 })
  orderIndex: number;
}
