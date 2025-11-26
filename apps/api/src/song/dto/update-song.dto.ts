import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSongDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  youtubeUrl: string;

  @IsString()
  @IsOptional()
  artist: string;

  @IsString()
  @IsOptional()
  songThumnail: string;

  @IsString()
  @IsOptional()
  duration: string;
}
