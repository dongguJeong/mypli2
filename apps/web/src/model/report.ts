import type { ISong } from "./song";

export interface IReport {
  id: number;
  created_at: Date;
  song: { id: number };
}

export interface IReportList {
  song: ISong;
  reportCount: number;
}
