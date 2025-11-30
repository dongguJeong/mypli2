import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommend } from './entity/recommend.entity';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend]), AuthModule],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
