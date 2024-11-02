/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { CreateVocabularyStatusDto } from './dto/create-status.dto';
import { UpdateVocabularyStatusDto } from './dto/update-status.dto';

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
  async getVocabularyById(vocabularyId: string) {
    return await this.prismaService.vocabulary.findUnique({
      where: { id: vocabularyId },
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
  async deleteVocabulary(vocabularyId: string) {
    await this.prismaService.vocabulary.delete({
      where: { id: vocabularyId },
    });
  }
  async getVocabularyStatus(vocabularyId:string){
    return await this.prismaService.vocabularyStatus.findUnique({
      where: { id: vocabularyId },
    });
  }
  async getAllVocabularyStatus(){
    return await this.prismaService.vocabularyStatus.findMany();
  }
  async createVocabularyStatus(vocabularyStatus: CreateVocabularyStatusDto, vocabularyId: string,userId: string){
    return await this.prismaService.vocabularyStatus.create({
      data: {
        vocabulary: { connect: { id: vocabularyId } },
        status: vocabularyStatus.status,
        learnedAt: new Date(),
        nextReviewAt: new Date(),
        reviewStage: 1,
        user: { connect: { id: userId } }, 
      }
    });
}
  async updateVocabularyStatus(vocabularyId: string, vocabularyStatus: UpdateVocabularyStatusDto) {
    return await this.prismaService.vocabularyStatus.update({
      where: { id: vocabularyId },
      data: {
        status: vocabularyStatus.status,
        learnedAt: new Date(),
        nextReviewAt: new Date(),
        reviewStage: 1,
      }
    });
  }
  async deleteVocabularyStatus(vocabularyId: string) {
    await this.prismaService.vocabularyStatus.delete({
      where: { id: vocabularyId },
    });
  }
  async createBulkVocabulary(vocabularies: CreateVocabularyDto[], lessonId: string) {
    return await this.prismaService.vocabulary.createMany({
      data: vocabularies.map((vocabulary) => ({
        wordJP: vocabulary.wordJP,
        wordVN: vocabulary.wordVN,
        kanji: vocabulary.kanji,
        lessonId: lessonId,
      })),
    });
  }
  
}
