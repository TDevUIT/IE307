/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { CreateLessonDto, UpdateLessonDto } from 'src/dto/lessonDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    const { title, content, courseId, vocabularies, grammars, miniTests, insights, listenings } =
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
        insights: {
          create: insights || [],
        },
        listenings: {
          create: listenings || [],
        },
      },
    });

    return lesson;
  }
  
  async getAllLessons() {
    return this.prisma.lesson.findMany({
      include: {
        flashCards: true,
        grammars: true,
        vocabularies: true,
        miniTests: true,
        insights: true,
        listenings: true,
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
        insights: true,
        listenings: true,
      },
    });
  }

  async getAllLessonNames(): Promise<any[]> {
    return await this.prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
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

  async createBulkLessons(courseId: string, createLessonsDto: CreateLessonDto[]) {
    return this.prisma.$transaction(
      createLessonsDto.map((lessonDto) => {
        const { title, content, vocabularies, grammars, miniTests } = lessonDto;
  
        const flashCards =
          vocabularies?.map((vocab) => ({
            term: vocab.wordJP,
            definition: vocab.wordVN,
            kanji: vocab.kanji,
          })) || [];
  
        return this.prisma.lesson.create({
          data: {
            title,
            content,
            courseId,
            flashCards: {
              create: flashCards,
            },
            grammars: {
              create: grammars,
            },
            vocabularies: {
              create: vocabularies,
            },
            miniTests: {
              create: miniTests,
            },
          },
        });
      })
    );
  }
  
}
