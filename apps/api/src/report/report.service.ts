import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entity/report.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  async createReport(songId: number) {
    const newReport = this.reportRepo.create({ song: { id: songId } });
    await this.reportRepo.save(newReport);
    return newReport;
  }

  async deleteReport(songId: number) {
    await this.reportRepo.delete({ song: { id: songId } });
    return { id: songId };
  }

  async getReportList() {
    const reports = await this.reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.song', 'song')
      .select('song')
      .addSelect('COUNT(report.id)', 'reportCount')
      .groupBy('song.id')
      .getRawAndEntities();

    return reports.entities.map((report, index) => ({
      song: report.song,
      reportCount: parseInt(reports.raw[index].reportCount),
    }));
  }
}
