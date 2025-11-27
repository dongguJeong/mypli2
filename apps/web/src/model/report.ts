export interface IReport {
  id: number;
  created_at: Date;
  song: { id: number };
}

export interface IReportList {
  song: {
    id: number;
    title: string;
    artist: string;
    youtubeUrl: string;
    thumbnailUrl: string;
  };
  reportCount: number;
}
