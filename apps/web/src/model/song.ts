export interface ISong {
  id: number;
  youtubeUrl: string;
  title: string;
  artist: string;
  songThumbnail: string;
  duration: string;
}

export interface INormalizeYoutubeVideo {
  title: string;
  videoId: string;
  songThumbnail: string;
}
