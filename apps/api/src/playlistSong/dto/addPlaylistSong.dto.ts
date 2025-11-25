import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPlaylistSong {
  @IsString()
  title: string;

  @IsString()
  youtubeUrl: string;

  @IsString()
  @IsOptional()
  singer: string;

  @IsString()
  songThumnail: string;

  @IsNumber()
  orderIndex: number;

  @IsNumber()
  playlistId: number;
}
