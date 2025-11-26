export interface YoutubeSearchResult {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
}

export interface YoutubeSearchResponse {
  kind: 'youtube#searchListResponse';
  etag: string;

  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YoutubeSearchItem[];
}

export interface YoutubeSearchItem {
  kind: 'youtube#searchResult';
  etag: string;

  id: {
    kind: 'youtube#video';
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
