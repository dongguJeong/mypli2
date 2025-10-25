import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class SearchTrackDto {
  @IsString()
  q: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
