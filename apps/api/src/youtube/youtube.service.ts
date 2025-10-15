import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class YoutubeService {
  private youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  async searchVideos(query: string) {
    const res = await this.youtube.search.list({
      part: ['snippet'],
      q: query,
      maxResults: 10,
      type: ['video'],
    });

    return res.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channel: item.snippet.channelTitle,
    }));
  }
}
