import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entity/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { NormalizeYoutubeVideoDto } from './dto/normalize-youtubeVideo';
import axios from 'axios';
import { UpdateSongDto } from './dto/update-song.dto';
import { formatYoutubeTitle } from 'src/lib/format';

@Injectable()
export class SongService {
  constructor(@InjectRepository(Song) private songRepo: Repository<Song>) {}

  async createSong(dto: CreateSongDto) {
    const song = this.songRepo.create(dto);
    await this.songRepo.save(song);
    return song;
  }

  async normalizeYoutubeVideo(dto: NormalizeYoutubeVideoDto) {
    const videoRes = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: {
          part: 'contentDetails,snippet',
          id: dto.videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      },
    );

    if (!videoRes.data.items || videoRes.data.items.length === 0) {
      throw new NotFoundException('YouTube video not found');
    }

    const video = videoRes.data.items[0];
    const youtubeTitle = video.snippet.title;

    const parsed = formatYoutubeTitle(youtubeTitle);

    const existingSong = await this.songRepo.findOne({
      where: {
        title: parsed.title,
        artist: parsed.artist,
      },
    });

    if (existingSong) return existingSong;

    const newSong = {
      title: parsed.title,
      artist: parsed.artist,
      duration: video.contentDetails.duration,
      youtubeUrl: `https://www.youtube.com/embed/${dto.videoId}?autoplay=1`,
      songThumbnail: dto.songThumbnail,
    };

    return await this.songRepo.save(newSong);
  }

  async deleteSong(id: number) {
    await this.songRepo.delete({ id });
  }

  async updateSong(dto: UpdateSongDto) {
    const song = await this.songRepo.findOne({
      where: { id: dto.id },
    });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    const { id, ...updateData } = dto;

    await this.songRepo.update({ id }, updateData);

    return await this.songRepo.findOne({
      where: { id },
    });
  }
}
