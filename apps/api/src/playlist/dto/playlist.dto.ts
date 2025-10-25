import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
export class CreatePlaylistDto {
  @IsString() name: string;
  @IsOptional() @IsString() description?: string;
}

export class UpdatePlaylistDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
}

export class AddSongToPlaylistDto {
  @IsOptional() @IsNumber() songId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['youtube'])
  source?: 'youtube';

  @IsOptional()
  @IsString()
  videoId?: string;
}

export class SortPlaylistDto {
  orderedPlaylistSongIds: number[];
}
