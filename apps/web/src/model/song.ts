export interface SongAddResponse {
  id: number;
  songId: number;
}

export interface SongDeleteResponse {
  songId: number;
}

export interface IAddSong {
  youtubeUrl: string;
  title: string;
  singer: string;
  songThumnail: string;
  orderIndex: number;
  playlistId: number;
}

export interface IDeleteSong {
  songId: number;
}
