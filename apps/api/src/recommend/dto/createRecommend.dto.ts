import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecommendDto {
  @IsNumber()
  songId: number;

  @IsString()
  @IsOptional()
  description: string;
}
