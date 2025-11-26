import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entity/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { DeleteReportDto } from './dto/delete-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  async createReport(dto: CreateReportDto) {
    const newReport = this.reportRepo.create({ song: { id: dto.songId } });
    await this.reportRepo.save(newReport);
    return newReport;
  }

  async DeleteReportDto(dto: DeleteReportDto) {
    await this.reportRepo.delete({ id: dto.reportId });
    return { id: dto.reportId };
  }

  async getReportList() {
    return await this.reportRepo.find({
      relations: ['song'],
    });
  }
}
