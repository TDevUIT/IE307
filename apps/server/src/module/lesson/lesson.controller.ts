/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from 'src/dto/lessonDto';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from 'src/guard/admin.guard';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Post('bulk')
async createLessonsBulk(@Body() createLessonsDto: CreateLessonDto[]) {
  return this.lessonService.createLessonsBulk(createLessonsDto);
}


  @UseGuards(JWTGuard)
  @Get()
  async getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  async getLessonById(@Param('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @UseGuards(AdminAuthGuard)
  @Put(':id')
  async updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.updateLesson(id, updateLessonDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteLesson(@Param('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }
}
