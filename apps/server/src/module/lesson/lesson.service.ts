/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { CreateLessonDto, UpdateLessonDto } from 'src/dto/lessonDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const { title, content, courseId, vocabularies, grammars, miniTests } =
      createLessonDto;

    const flashCards =
      vocabularies?.map((vocab) => ({
        term: vocab.wordJP,
        definition: vocab.wordVN,
        kanji: vocab.kanji,
      })) || [];

    const lesson = await this.prisma.lesson.create({
      data: {
        title,
        content,
        courseId,
        flashCards: {
          create: flashCards,
        },
        grammars: {
          create: grammars || [],
        },
        vocabularies: {
          create: vocabularies || [],
        },
        miniTests: {
          create: miniTests || [],
        },
      },
    });

    return lesson;
  }

  async createLessonsBulk(createLessonsDto: CreateLessonDto[]) {
    const lessons = createLessonsDto.map(({ title, content, courseId}) => {
  
      return {
        title,
        content,
        courseId,
      };
    });
  
    const createdLessons = await this.prisma.lesson.createMany({
      data: lessons,
    });
  
    return createdLessons;
  }
  
  async getAllLessons() {
    return this.prisma.lesson.findMany({
      include: {
        flashCards: true,
        grammars: true,
        vocabularies: true,
        miniTests: true,
      },
    });
  }

  async getLessonById(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        flashCards: true,
        grammars: true,
        vocabularies: true,
        miniTests: true,
      },
    });
  }

  async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async deleteLesson(id: string) {
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
