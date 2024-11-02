/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { Course, Lesson } from '@prisma/client';
import { CourseService } from './course.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { CreateCourseDto, UpdateCourseDto } from '../../dto/courseDto';
import { AdminAuthGuard } from '../../guard/admin.guard';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('bulk')
  async createBulkCourses(
    @Body() createCoursesDto: CreateCourseDto[],
  ): Promise<Course[]> {
    return this.courseService.createBulkCourses(createCoursesDto);
  }


  @UseGuards(JWTGuard)
  @Get()
  async getCourses(@Req() req: Request): Promise<Course[]> {
    const userId = req['user'].id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.courseService.getCourses(userId);
  }
  //
  @UseGuards(AdminAuthGuard)
  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }
  @Get(':id')
  async getCourseDetails(@Param('id') id: string): Promise<Course> {
    return this.courseService.getCourseDetails(id);
  }
  @UseGuards(AdminAuthGuard)
  @Put(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.updateCourse(id, updateCourse);
  }
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteCourse(@Param('id') id: string): Promise<void> {
    await this.courseService.deleteCourse(id);
  }
  @Get(':id/lessons')
  async getLessonsByCourseId(@Param('id') id: string): Promise<Lesson[]> {
    return this.courseService.getLessonsByCourseId(id);
  }
}
