export class PlaylistDetailDto {
  playlist: {
    id: number;
    title: string;
    detail: string | null;
    thumbnailUrl: string | null;
    isPublic: boolean;
    createdAt: Date;
  };
  owner: {
    id: number;
    username: string;
  };
  songs: Array<{
    id: number;
    youtubeUrl: string;
    title: string;
    songThumnail: string | null;
    orderIndex: number;
  }>;

  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
}
