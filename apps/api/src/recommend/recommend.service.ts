import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommend } from './entity/recommend.entity';
import { Repository } from 'typeorm';
import { CreateRecommendDto } from './dto/createRecommend.dto';
import { DeleteRecommendDto } from './dto/deleteRecommend.dto';
import { UpdateRecommendDto } from './dto/updateRecomend.dto';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(Recommend) private recommendRepo: Repository<Recommend>,
  ) {}

  async createRecommend(dto: CreateRecommendDto, userId: number) {
    const recommend = this.recommendRepo.create({
      user: { id: userId },
      song: { id: dto.songId },
      description: dto.description,
    });

    await this.recommendRepo.save(recommend);
    return { id: recommend.id };
  }

  async deleteRecommend(recommendId: number, userId: number) {
    const recommend = await this.recommendRepo.findOne({
      where: { id: recommendId },
    });

    if (recommend?.user.id !== userId) {
      return new UnauthorizedException();
    }

    await this.recommendRepo.delete({ id: recommendId });
  }

  async updateRecommend(
    dto: UpdateRecommendDto,
    userId: number,
    recommendId: number,
  ) {
    const recommend = await this.recommendRepo.findOne({
      where: { id: recommendId },
      relations: ['user'],
    });

    if (!recommend) {
      throw new NotFoundException('Recommend not found');
    }
    if (recommend?.user.id !== userId) {
      return new UnauthorizedException();
    }

    const { ...updateFields } = dto;
    if (Object.keys(updateFields).length === 0) {
      throw new BadRequestException('No fields to update');
    }

    await this.recommendRepo.update({ id: recommendId }, updateFields);

    await this.recommendRepo.save(recommend);

    return await this.recommendRepo.findOne({
      where: { id: recommendId },
      relations: ['song', 'user'],
    });
  }
}
