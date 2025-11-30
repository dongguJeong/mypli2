import type { ISong } from "./song";

export interface IRecommendBody {
  songId: number;
  description: string;
}

export interface IRecommend {
  id: number;
  description: string;
  createdAt: Date;
  song: ISong;
  recommendedBy: {
    id: number;
    username: string;
  };
}
