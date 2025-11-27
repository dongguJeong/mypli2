import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Playlist } from 'src/playlist/entity/playlist.entity';
import { Song } from 'src/song/entity/song.entity';
import { YoutubeSearchItem, YoutubeSearchResponse } from 'src/types/search';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
    @InjectRepository(Song) private songRepo: Repository<Song>,
  ) {}

  async searchYoutube(q: string): Promise<YoutubeSearchItem[]> {
    const searchRes = await axios.get<YoutubeSearchResponse>(
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

    return searchRes.data.items;
  }

  async searchSongRepo(q: string) {
    return await this.songRepo
      .createQueryBuilder('playlist')
      .where('LOWER(playlist.title) LIKE LOWER(:q)', { q: `%${q}%` })
      .getMany();
  }

  async searchPlaylist(q: string) {
    return await this.playlistRepo
      .createQueryBuilder('playlist')
      .where('LOWER(playlist.title) LIKE LOWER(:q)', { q: `%${q}%` })
      .getMany();
  }
}
