import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { SessionGuard } from 'src/auth/auth.guard';

@Controller('report')
@UseGuards(SessionGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  createSongReport(@Body('dto') dto: CreateReportDto) {
    return this.reportService.createReport(dto);
  }

  @Delete(':id')
  deleteSongReport(@Param('id') id: number) {
    return this.reportService.DeleteReportDto({ reportId: id });
  }
}
