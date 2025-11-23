import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
  ) {}

  async searchYoutube(q: string) {
    const res = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          q,
          type: 'video',
          videoEmbeddable: 'true',
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
        },
      },
    );

    return res.data.items;
  }

  async searchPlaylist(q: string) {
    return await this.playlistRepo
      .createQueryBuilder('playlist')
      .where('LOWER(playlist.title) LIKE LOWER(:q)', { q: `%${q}%` })
      .getMany();
  }
}
