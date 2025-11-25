export interface PlaylistMostLikedResponse {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  likeCount: number;
}

export interface PlaylistListResponse {
  id: number;
  title: string;
  thumbnailUrl: string | null;
}

export interface PlaylistCreateResponse {
  id: number;
}

export interface PlaylistDetailResponse {
  playlist: {
    id: number;
    title: string;
    detail?: string;
    thumbnailUrl?: string;
    isPublic: boolean;
    createdAt: Date;
  };
  owner: {
    id: number;
    username: string;
  };
  songs: {
    id: number;
    youtubeUrl: string;
    title: string;
    songThumnail: string;
    orderIndex: number;
  }[];
  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
}

export interface PlaylistUpdateBody {
  title?: string;
  detail?: string;
  isPublic?: boolean;
}
