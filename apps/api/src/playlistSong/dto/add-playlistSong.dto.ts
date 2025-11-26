import { IsNumber } from 'class-validator';

export class AddPlaylistSong {
  @IsNumber()
  songId: number;

  @IsNumber()
  orderIndex: number;

  @IsNumber()
  playlistId: number;
}
