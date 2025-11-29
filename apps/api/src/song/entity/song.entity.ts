import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { Recommend } from 'src/recommend/entity/recommend.entity';
import { Report } from 'src/report/entity/report.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('song')
export class Song {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 500, name: 'youtube_url' })
  youtubeUrl: string;

  @Column({ length: 255, default: 'Unknown Artist' })
  artist: string;

  @Column({ length: 255, nullable: true, name: 'song_thumbnail' })
  songThumbnail: string;

  @Column({ type: 'varchar' })
  duration: string;

  @OneToMany(() => PlaylistSong, (playlistSong) => playlistSong.song, {
    cascade: true,
  })
  playlists: PlaylistSong[];

  @OneToMany(() => Report, (report) => report.song, { cascade: true })
  reports: Report[];

  @OneToMany(() => Recommend, (recommend) => recommend.song, { cascade: true })
  recommends: Recommend[];
}
