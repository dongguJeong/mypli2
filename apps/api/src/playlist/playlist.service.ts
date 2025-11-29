import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { PlaylistMostLikedDto } from './dto/most-liked.dto';
import { PlaylistDetailResponse } from './response/playlistDetilResponse';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
    @InjectRepository(PlaylistBookmark)
    private playlistBookmarkRepo: Repository<PlaylistBookmark>,
    @InjectRepository(PlaylistLike)
    private playlistLikeRepo: Repository<PlaylistLike>,
    @InjectRepository(PlaylistSong)
    private playlistSongRepo: Repository<PlaylistSong>,
  ) {}

  async create(userId: number) {
    const playlist = this.playlistRepo.create({
      title: '새 플레이리스트',
      owner: { id: userId },
    });
    await this.playlistRepo.save(playlist);
    return { id: playlist.id };
  }

  async delete(playlistId: number, userId: number) {
    const result = await this.playlistRepo.delete({
      id: playlistId,
      owner: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Playlist not found or not owned by you');
    }

    return { id: playlistId };
  }

  async update(playlistId: number, userId: number, dto: UpdatePlaylistDto) {
    const playlist = await this.playlistRepo.findOne({
      where: { id: playlistId },
      relations: ['owner'],
    });

    if (!playlist) throw new NotFoundException('Playlist not found');
    if (playlist.owner.id !== userId)
      throw new ForbiddenException('You cannot edit this playlist');

    Object.assign(playlist, dto);
    await this.playlistRepo.save(playlist);
    return { id: playlistId };
  }

  async listMine(userId: number) {
    return this.playlistRepo.find({
      select: ['id', 'title', 'thumbnailUrl'],
      where: { owner: { id: userId } },
    });
  }

  async getMostLikedPlaylist(limit = 5): Promise<Array<PlaylistMostLikedDto>> {
    const rows = await this.playlistLikeRepo
      .createQueryBuilder('like')
      .leftJoin('like.playlist', 'playlist')
      .select('playlist.id', 'id')
      .addSelect('playlist.title', 'title')
      .addSelect('playlist.detail', 'detail')
      .addSelect('playlist.thumbnailUrl', 'thumbnailUrl')
      .addSelect('COUNT(*)', 'likeCount')
      .where('playlist.isPublic = :isPublic', { isPublic: true })
      .groupBy('playlist.id')
      .orderBy('likeCount', 'DESC')
      .addOrderBy('playlist.id', 'ASC')
      .limit(limit)
      .getRawMany<PlaylistMostLikedDto>();

    return rows.map((v) => ({
      ...v,
      likeCount: Number(v.likeCount),
    }));
  }

  async getNewest(limit = 3) {
    return this.playlistRepo.find({
      select: ['id', 'title', 'thumbnailUrl', 'createdAt'],
      where: {
        isPublic: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      relations: ['owner'],
    });
  }

  async getDetail(
    playlistId: number,
    userId: number | null,
  ): Promise<PlaylistDetailResponse> {
    const playlist = await this.playlistRepo.findOne({
      where: { id: playlistId },
      relations: ['owner'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const isOwner = userId != null && playlist.owner.id === userId;
    if (!playlist.isPublic && !isOwner) {
      throw new ForbiddenException('This playlist is private');
    }

    const playlistSongs = await this.playlistSongRepo.find({
      where: { playlist: { id: playlistId } },
      relations: ['song'],
    });

    let isLiked = false;
    let isBookmarked = false;

    if (userId !== null) {
      const [liked, bookmarked] = await Promise.all([
        this.playlistLikeRepo.exists({
          where: { playlistId, userId },
        }),
        this.playlistBookmarkRepo.exists({
          where: { playlistId, userId },
        }),
      ]);

      isLiked = liked;
      isBookmarked = bookmarked;
    }

    return {
      playlist: {
        id: playlist.id,
        title: playlist.title,
        detail: playlist.detail,
        thumbnailUrl: playlist.thumbnailUrl,
        isPublic: playlist.isPublic,
        createdAt: playlist.createdAt,
      },
      owner: {
        id: playlist.owner.id,
        username: playlist.owner.username,
      },
      songs: playlistSongs.map((v) => ({
        id: v.song.id,
        title: v.song.title,
        artist: v.song.artist,
        youtubeUrl: v.song.youtubeUrl,
        songThumnail: v.song.songThumbnail,
        duration: v.song.duration,
      })),
      isLiked,
      isBookmarked,
      isOwner,
    };
  }
}
