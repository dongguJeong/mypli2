import { IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  youtubeUrl: string;

  @IsString()
  artist: string;

  @IsString()
  songThumnail: string;

  @IsString()
  duration: string;
}
