import axios, { AxiosInstance } from 'axios';

export class YouTubeClient {
  private readonly http: AxiosInstance;

  constructor(private readonly apiKey = process.env.GOOGLE_API_KEY!) {
    this.http = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      timeout: 8000,
    });
  }

  async searchVideos(query: string) {
    const res = await this.http.get('/search', {
      params: {
        q: query,
        key: this.apiKey,
        part: 'snippet',
        maxResults: 10,
        videoEmbeddable: true,
        type: 'video',
      },
    });

    return res.data.items;
  }
}
