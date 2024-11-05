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
import { Course, Lesson } from '@prisma/client';
import { CourseService } from './course.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { CreateCourseDto, UpdateCourseDto } from '../../dto/courseDto';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { Request as ExpressRequest } from 'express';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('bulk')
  async createBulkCourses(
    @Body() createCoursesDto: CreateCourseDto[],
    @Req() req: Request
  ): Promise<Course[]> {
    const createdById = req['user'].id;
    return this.courseService.createBulkCourses(createCoursesDto,createdById);
  }

  @Get('all')
  async getAllCourses() {
    console.log("Get Courses");
    return this.courseService.getCourses();
  }

  @UseGuards(JWTGuard)
  @Get('user')
  async getCoursesByUserId(@Req() req: Request): Promise<Course[]> {
    const userId = req['user'].id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.courseService.getCoursesByUserId(userId);
  }

  @UseGuards(AdminAuthGuard)
  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: ExpressRequest
  ): Promise<Course> {
    const createdById = req['user'].id;
    return this.courseService.createCourse(createCourseDto, createdById);
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
  async deleteCourse(@Param('id') id: string): Promise<{ message: string }> {
    await this.courseService.deleteCourse(id);
    return { message: 'Course deleted successfully' };
  }


  @Get(':id/lessons')
  async getLessonsByCourseId(@Param('id') id: string): Promise<Lesson[]> {
    return this.courseService.getLessonsByCourseId(id);
  }
}
