// apps/api/src/entities/song.entity.ts
import { PlaylistSong } from 'src/playlist-song/entity/playlist-song.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';

export type SongSource = 'youtube' | 'file' | 'external';

@Entity('songs')
@Index(['normalizedTitle', 'normalizedArtist'])
export class Song {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ['youtube', 'file', 'external'],
    default: 'youtube',
  })
  sourceType: SongSource;

  @Index()
  @Column({ nullable: true }) // youtube videoId
  sourceId: string | null;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Index()
  @Column()
  normalizedTitle: string;

  @Index()
  @Column()
  normalizedArtist: string;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ type: 'int', nullable: true })
  durationSec: number;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ default: false })
  analyzed: boolean;

  @Column({ type: 'int', nullable: true })
  bpm: number;

  @Column({ nullable: true })
  musicalKey: string;

  @Column({ type: 'json', nullable: true })
  features: any;

  // 외부 식별자
  @Index()
  @Column({ nullable: true })
  isrc: string;

  @Index()
  @Column({ nullable: true })
  mbid: string; // MusicBrainz ID

  @Column({ type: 'json', nullable: true })
  externalIds: any; // spotifyId, appleId 등

  @OneToMany(() => PlaylistSong, (ps) => ps.song)
  playlists: PlaylistSong[];
}
