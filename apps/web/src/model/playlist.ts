import type { ISong } from "./song";

export interface IPlaylist {
  id: number;
  owner: number;
  title: string;
  detail?: string;
  thumnailUrl: string;
  isPublic: boolean;
  created_at: Date;
}

export interface IUpdatePlaylist {
  title?: string;
  detail?: string | null;
  isPublic?: boolean;
}

export interface IMostLikedPlaylist extends IPlaylist {
  likeCount: number;
}

export interface IPlaylistDetail {
  playlist: IPlaylist;
  owner: {
    id: number;
    username: string;
    profileImage: string | null;
  };
  songs: ISong[];
  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
}
