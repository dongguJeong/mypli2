import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create.dto';
import { UpdatePlaylistDto } from './dto/update.dto';
import { PlaylistBookmark } from 'src/playlistBookmark/entity/playlistBookmark.entity';
import { PlaylistLike } from 'src/playlistLike/entity/playlistLike.entity';
import { PlaylistSong } from 'src/playlistSong/entity/playlistSong.entity';
import { PlaylistDetailDto } from './dto/detail.dto';

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

  async create(dto: CreatePlaylistDto, userId: number) {
    const playlist = this.playlistRepo.create({
      ...dto,
      owner: { id: userId },
    });
    return this.playlistRepo.save(playlist);
  }

  async delete(playlistId: number, userId: number) {
    const result = await this.playlistRepo.delete({
      id: playlistId,
      owner: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException('Playlist not found or not owned by you');
    }

    return { success: true };
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
    return this.playlistRepo.save(playlist);
  }

  async listMine(userId: number) {
    return this.playlistRepo.find({ where: { owner: { id: userId } } });
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
        youtubeUrl: song.youtubeUrl,
        singer: song.singer,
        songThumnail: song.songThumnail,
        orderIndex: song.orderIndex,
      })),
      isLiked,
      isBookmarked,
      isOwner,
    };
  }
}
