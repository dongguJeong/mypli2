import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Song } from 'src/song/entity/song.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('playlist_song')
export class PlaylistSong {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs, {
    onDelete: 'CASCADE',
  })
  playlist: Playlist;

  @ManyToOne(() => Song, (song) => song.playlists, {
    onDelete: 'CASCADE',
  })
  song: Song;
}
