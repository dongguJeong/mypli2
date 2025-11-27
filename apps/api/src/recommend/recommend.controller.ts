import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { CreateRecommendDto } from './dto/createRecommend.dto';
import { SessionGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.current-user.decorator';
import { UpdateRecommendDto } from './dto/updateRecomend.dto';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post()
  @UseGuards(SessionGuard)
  createRecommend(
    @Body('dto') dto: CreateRecommendDto,
    @CurrentUser() userId: number,
  ) {
    return this.recommendService.createRecommend(dto, userId);
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  deleteRecommend(
    @Param('id', ParseIntPipe) recommendId: number,
    @CurrentUser() userId: number,
  ) {
    return this.recommendService.deleteRecommend(recommendId, userId);
  }

  @Patch(':id')
  @UseGuards(SessionGuard)
  updateRecommend(
    @Param('id', ParseIntPipe) recommendId: number,
    @CurrentUser() userId: number,
    @Body() dto: UpdateRecommendDto,
  ) {
    return this.recommendService.updateRecommend(dto, userId, recommendId);
  }

  @Get('list')
  getRecommends(@Query('limit') limit: number) {
    return this.recommendService.getRecommends(limit);
  }
}
