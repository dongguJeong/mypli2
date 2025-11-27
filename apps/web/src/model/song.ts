export interface ISong {
  id: number;
  youtubeUrl: string;
  title: string;
  artist: string;
  songThumnail: string;
  duration: string;
}

export interface INormalizeYoutubeVideo {
  title: string;
  youtubeUrl: string;
  songThumnail: string;
  videoId: string;
}
