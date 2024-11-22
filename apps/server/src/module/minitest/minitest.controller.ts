/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MinitestService } from './minitest.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateMinitestDto } from './dto/create-minitest.dto';
import { UpdateMinitestDto } from './dto/update-minitest.dto';

@Controller('minitest')
export class MinitestController {
  constructor(private readonly minitestService: MinitestService) {}

  @Get(':lessonId')
  @UseGuards(JWTGuard)
  async getMinitestByLessonId(@Param('lessonId') lessonId: string) {
    return this.minitestService.getMinitestByLessonId(lessonId);
  }
  @Get(':minitestId')
  @UseGuards(JWTGuard)
  async getMinitestById(@Param('minitestId') minitestId: string) {
    return this.minitestService.getMinitestById(minitestId);
  } 
  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getAll() {
    return this.minitestService.getAll();
  }
  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createMinitest(
    @Param('lessonId') lessonId: string,
    @Body() createMinitestDto: CreateMinitestDto,
  ) {
    return this.minitestService.createMinitest(createMinitestDto, lessonId);
  }
  @Put(':minitestId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async updateMinitest(
    @Param('minitestId') minitestId: string,
    @Body() minitest: UpdateMinitestDto,
  ) {
    return this.minitestService.updateMinitest(minitestId, minitest);
  }
  @Delete(':minitestId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteMinitest(@Param('minitestId') minitestId: string) {
    return this.minitestService.deleteMinitest(minitestId);
  }
  @Post('bulk/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
async createBulkMinitests(
  @Param('lessonId') lessonId: string,
  @Body() minitests: Array<CreateMinitestDto>,
) {
  return this.minitestService.createBulkMinitests(minitests, lessonId);
}
@Delete('clear/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async clearMinitest(@Param('lessonId') lessonId: string) {
    return this.minitestService.clearMinitest(lessonId);
  }

}
