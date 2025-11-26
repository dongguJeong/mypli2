import { IsNumber } from 'class-validator';

export class DeleteReportDto {
  @IsNumber()
  reportId: number;
}
