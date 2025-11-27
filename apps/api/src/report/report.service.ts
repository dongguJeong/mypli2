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

  async deleteReport(reportId: number) {
    await this.reportRepo.delete({ id: reportId });
    return { id: reportId };
  }

  async getReportList() {
    const reports = await this.reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.song', 'song')
      .select([
        'song.id',
        'song.title',
        'song.artist',
        'song.youtubeUrl',
        'song.thumbnailUrl',
      ])
      .addSelect('COUNT(report.id)', 'reportCount')
      .groupBy('song.id')
      .orderBy('reportCount', 'DESC')
      .getRawAndEntities();

    return reports.raw.map((raw, index) => ({
      song: reports.entities[index].song,
      reportCount: parseInt(raw.reportCount),
    }));
  }
}
