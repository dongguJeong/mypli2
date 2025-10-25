// apps/api/src/modules/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { YouTubeClient } from '../../providers/youtube.client';
import { Song } from 'src/song/song.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Song) private songs: Repository<Song>,
    private readonly yt: YouTubeClient,
  ) {}

  async searchDb(q: string, limit = 20) {
    return this.songs.find({
      where: [{ title: ILike(`%${q}%`) }, { artist: ILike(`%${q}%`) }],
      take: limit,
    });
  }

  async searchYouTube(q: string, limit = 20) {
    return this.yt.search(q, limit); // { title, channel, videoId, durationSec, thumbnails[] }
  }

  combineDedup(dbHits: Song[], ytHits: any[]) {
    // 1) videoId로 중복 제거
    const seenVideo = new Set(dbHits.map((s) => s.sourceId).filter(Boolean));
    const ytFiltered = ytHits.filter((x) => !seenVideo.has(x.videoId));

    // 2) normalized title/artist로 유사 중복 제거(간단 버전)
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
    const seenPair = new Set(
      dbHits.map((s) => `${s.normalizedTitle}:${s.normalizedArtist}`),
    );
    const ytFiltered2 = ytFiltered.filter((x) => {
      const key = `${norm(x.title)}:${norm(x.channel ?? '')}`;
      return !seenPair.has(key);
    });

    // 3) unified 형태
    const dbPart = dbHits.map((s) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      durationSec: s.durationSec,
      coverUrl: s.coverUrl,
      genre: s.genre,
      analyzed: s.analyzed,
      source: 'db' as const,
    }));

    const ytPart = ytFiltered2.map((y) => ({
      title: y.title,
      artist: y.channel, // 임시. 매칭 후 정정됨
      durationSec: y.durationSec,
      coverUrl: y.thumbnail,
      source: 'youtube' as const,
      youtubeVideoId: y.videoId,
      analyzed: false,
    }));

    return [...dbPart, ...ytPart];
  }
}
