import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { SessionGuard } from 'src/auth/auth.guard';

@Controller('report')
@UseGuards(SessionGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  createSongReport(@Body('reportId') songId: number) {
    return this.reportService.createReport(songId);
  }

  @Delete(':id')
  deleteSongReport(@Param('reportId', ParseIntPipe) reportId: number) {
    return this.reportService.deleteReport(reportId);
  }

  @Get('list')
  getReportList() {
    return this.reportService.getReportList();
  }
}
