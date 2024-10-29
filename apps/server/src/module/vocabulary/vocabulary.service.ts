/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getVocabularyByLessonId(lessonId: string) {
    return await this.prismaService.vocabulary.findMany({
      where: { lessonId },
    });
  }
  async getALL() {
    return await this.prismaService.vocabulary.findMany();
  }
  async getVocabularyById(id: string) {
    return await this.prismaService.vocabulary.findUnique({
      where: { id },
    });
  }
  async createVocabulary(vocabularyInput: CreateVocabularyDto,lessonId: string) {
    return await this.prismaService.vocabulary.create({
      data: {
        wordJP: vocabularyInput.wordJP,
        wordVN: vocabularyInput.wordVN,
        kanji: vocabularyInput.kanji,
        lessonId: lessonId,
      }
    });
  }
  async deleteVocabulary(id: string) {
    await this.prismaService.vocabulary.delete({
      where: { id },
    });
  }
}
