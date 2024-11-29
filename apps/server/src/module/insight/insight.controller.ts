/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { InsightService } from './insight.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';

@Controller('insight')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Get(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getInsightByLessonId(@Param('lessonId') lessonId: string) {
    return this.insightService.getInsightByLessonId(lessonId);
  }

  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getAll() {
    return this.insightService.getAll();
  }

  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createInsight(
    @Body() createInsightDto: CreateInsightDto,
    @Param('lessonId') lessonId: string,
  ) {
    return this.insightService.createInsight(createInsightDto, lessonId);
  }

  @Put(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async updateInsight(
    @Param('id') id: string,
    @Body() updateInsightDto: UpdateInsightDto,
  ) {
    return this.insightService.updateInsight(id, updateInsightDto);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteInsight(@Param('id') id: string) {
    return this.insightService.deleteInsight(id);
  }

  @Post('bulk/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createBulkInsight(
    @Body() insights: Array<CreateInsightDto>,
    @Param('lessonId') lessonId: string,
  ) {
    return this.insightService.createBulkInsight(insights, lessonId);
  }

  @Delete('clear/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async clearInsight(@Param('lessonId') lessonId: string) {
    return this.insightService.clearInsight(lessonId);
  }
}
