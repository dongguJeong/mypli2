import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entity/playlist.entity';
import { Repository } from 'typeorm';
import { playlistCreateDto } from './dto/create.dto';
import { UpdatePlaylistDto } from './dto/update.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private playlist: Repository<Playlist>,
  ) {}

  create(dto: playlistCreateDto, userId: number) {
    const playlist = this.playlist.create({ ...dto, owner: { id: userId } });
    return this.playlist.save(playlist);
  }

  delete(playlistId: number, userId: number) {
    return this.playlist.delete({ id: playlistId, owner: { id: userId } });
  }

  async update(playlistId: number, userId: number, dto: UpdatePlaylistDto) {
    const playlist = await this.playlist.findOne({
      where: { id: playlistId },
      relations: ['owner'],
    });

    if (!playlist) throw new NotFoundException('Playlist not found');
    if (playlist.owner.id !== userId)
      throw new ForbiddenException('You cannot edit this playlist');

    Object.assign(playlist, dto);
    return this.playlist.save(playlist);
  }

  listMine(userId: number) {
    return this.playlist.find({ where: { owner: { id: userId } } });
  }
}
