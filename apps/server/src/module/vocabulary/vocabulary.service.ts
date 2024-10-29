/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class VocabularyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getVocabularyByLessonId(lessonId: string): Promise<any> {
    return this.prismaService.vocabulary.findMany({
      where: { lessonId },
    });
  }
  async getALL(): Promise<any> {
    return this.prismaService.vocabulary.findMany();
  }

}
