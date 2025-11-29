import { IsString } from 'class-validator';

export class NormalizeYoutubeVideoDto {
  @IsString()
  title: string;

  @IsString()
  songThumbnail: string;

  @IsString()
  videoId: string;
}
