import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeletePlaylistSongParamsDto {
  @Type(() => Number)
  @IsNumber()
  songId: number;

  @Type(() => Number)
  @IsNumber()
  playlistId: number;
}
