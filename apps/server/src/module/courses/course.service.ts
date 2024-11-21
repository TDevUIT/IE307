/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Course, Lesson } from '@prisma/client';
import { CreateCourseDto, UpdateCourseDto } from 'src/dto/courseDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourses(): Promise<Course[]> {
    console.log("Get Courses");
    return await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          }
        },
        lessons: false,
        createdAt: true,
        updatedAt: true,
        statuses: false,
        createdById: true,
      }
    });
  }

  async getAllCoursesNames(): Promise<any[]> {
    return await this.prisma.course.findMany({
      select: {
        id: true,
        title: true,
      },
    });
  }

  async getCoursesByUserId(userId: string): Promise<Course[]> {
    return await this.prisma.course.findMany({
      where: {
        createdById: userId,
      },
      include: {
        lessons: true,
      },
    });
  }

  async getCourseDetails(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          }
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    console.log(course);
    return course;
  }

  async getLessonsByCourseId(id: string): Promise<Lesson[]> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course.lessons;
  }

  async createCourse(createCourse: CreateCourseDto, createdById: string): Promise<Course> {
    return this.prisma.course.create({
      data: {
        ...createCourse,
        createdBy: { connect: { id: createdById } },
      },
    });
  }

  async updateCourse(id: string, updateCourse: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: updateCourse,
    });
  }

  async deleteCourse(id: string): Promise<void> {
    await this.prisma.course.delete({
      where: { id },
    });
  }

  async createBulkCourses(createCoursesDto: CreateCourseDto[], createdById: string): Promise<Course[]> {
    return this.prisma.$transaction(
      createCoursesDto.map((courseDto) =>
        this.prisma.course.create({
          data: {
            ...courseDto,
            createdById,
          },

        })
      )
    );
  }
}
