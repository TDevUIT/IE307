/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
@Controller('vocabulary')
@UseGuards(JWTGuard)
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}
  
  @Get(':lessonId')
  async getVocabularyByLessonId(@Param('lessonId') lessonId: string) {
    return this.vocabularyService.getVocabularyByLessonId(lessonId);
  }
  
  @Get()
  async getAll() {
    return this.vocabularyService.getALL();
  }
  
}
