import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommend } from './entity/recommend.entity';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend])],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
