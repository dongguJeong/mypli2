export interface YoutubeSearchItem {
  kind: "youtube#searchResult";
  etag: string;

  id: {
    kind: "youtube#video";
    videoId: string;
  };

  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;

    thumbnails: {
      default: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      high?: { url: string; width: number; height: number };
    };
  };
}
