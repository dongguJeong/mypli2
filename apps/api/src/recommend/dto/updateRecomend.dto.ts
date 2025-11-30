import { IsString } from 'class-validator';

export class UpdateRecommendDto {
  @IsString()
  description: string;
}
