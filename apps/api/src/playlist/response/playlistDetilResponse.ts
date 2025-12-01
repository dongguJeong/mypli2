export class PlaylistDetailResponse {
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
    songThumbnail: string | null;
    artist: string;
    duration: string;
  }>;

  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
}
