import { IsNumber } from 'class-validator';

export class DeletePlaylistSong {
  @IsNumber()
  songId: number;
}
