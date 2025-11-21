import { IsNumber, IsString } from 'class-validator';

export class AddPlaylistSong {
  @IsString()
  youtubeUrl: string;

  @IsString()
  singer: string;

  @IsString()
  songThumnail: string;

  @IsNumber()
  orderIndex: number;

  @IsNumber()
  playlistId: number;
}
