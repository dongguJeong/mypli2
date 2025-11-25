import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { UpdatePlaylistDto } from './dto/update.dto';
import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { PlaylistDetailDto } from './dto/detail.dto';
import { PlaylistMostLikedDto } from './dto/mostLiked.dto';

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
        isPublic: true, // 공개 목록만 보여주고 싶으면
      },
      order: {
        createdAt: 'DESC', // 최신순
      },
      take: limit, // TOP 3
      relations: ['owner'], // 필요하면 relations 추가
    });
  }

  async getDetail(
    playlistId: number,
    userId: number | null,
  ): Promise<PlaylistDetailDto> {
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
      order: { orderIndex: 'ASC' },
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
      songs: playlistSongs.map((song) => ({
        id: song.id,
        title: song.title,
        youtubeUrl: song.youtubeUrl,

        songThumnail: song.songThumnail,
        orderIndex: song.orderIndex,
      })),
      isLiked,
      isBookmarked,
      isOwner,
    };
  }
}
