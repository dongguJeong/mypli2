import { LikePlaylist } from 'src/likePlaylist/entity/like-playlist.entity';
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

  @ManyToOne(() => User, (user) => user.playlists, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => PlaylistSong, (ps) => ps.playlist, { cascade: true })
  songs: PlaylistSong[];

  @OneToMany(() => LikePlaylist, (lp) => lp.playlist, { cascade: true })
  likes: LikePlaylist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
