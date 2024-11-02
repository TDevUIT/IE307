/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';


@Injectable()
export class FlashcardService {
  constructor(private readonly prismaService: PrismaService) {}

   async getAll(){
    return await this.prismaService.flashCard.findMany({
      include: {
        lesson: true
      }
    });
   }
    async getFlashcardByLessonId(lessonId: string) {
      return await this.prismaService.flashCard.findMany({
        where: { lessonId },
        include: {
          lesson: true
        }
      });
    }
    async getFlashcardById(flashcardId: string) {
      return await this.prismaService.flashCard.findUnique({
        where: { id: flashcardId },
        include: {
          lesson: true
        }
      });
    }
    async createFlashcard(flashcard: CreateFlashcardDto,lessonId: string) {
      return await this.prismaService.flashCard.create({
        data: {
          term: flashcard.term,
          definition: flashcard.definition,
          kanji: flashcard.kanji,
          lessonId: lessonId,
        }
      });
    }
    async deleteFlashcard(flashcardId: string) {
      await this.prismaService.flashCard.delete({
        where: { id: flashcardId },
      });
    }
    async updateFlashcard(flashcardId: string, flashcard: UpdateFlashcardDto) {
      return await this.prismaService.flashCard.update({
        where: { id: flashcardId },
        data: {
          term: flashcard.term,
          definition: flashcard.definition,
          kanji: flashcard.kanji,
        },
      });
    }
    async createFlashcardsBulk(flashcards: CreateFlashcardDto[], lessonId: string) {
      return await this.prismaService.flashCard.createMany({
        data: flashcards.map(flashcard => ({
          term: flashcard.term,
          definition: flashcard.definition,
          kanji: flashcard.kanji,
          lessonId: lessonId,
        })),
      });
    }
    
}
