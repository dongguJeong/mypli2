import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRecommendDto {
  @IsNumber()
  @IsOptional()
  songId: number;

  @IsString()
  @IsOptional()
  description: string;
}
