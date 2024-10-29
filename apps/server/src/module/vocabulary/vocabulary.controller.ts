/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}
  
  @Get(':lessonId')
  @UseGuards(JWTGuard)
  async getVocabularyByLessonId(@Param('lessonId') lessonId: string) {
    return this.vocabularyService.getVocabularyByLessonId(lessonId);
  }
  
  @Get()
  @UseGuards(JWTGuard)
  async getAll() {
    return this.vocabularyService.getALL();
  }
  @Get()
  @UseGuards(JWTGuard)
   async getVocabById(
    @Param('id') id: string,
   ){
    return this.vocabularyService.getVocabularyById(id);
   }
  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createVocabulary(
    @Body() createVocabularyDto: CreateVocabularyDto,
    @Param('lessonId') lessonId: string,
  ) {
    return this.vocabularyService.createVocabulary(createVocabularyDto, lessonId);
  }
  @Delete(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteVocabulary(@Param('id') id: string) {
    return this.vocabularyService.deleteVocabulary(id);
  }
}
