/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get,Put, Param, Post, UseGuards } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { CreateVocabularyStatusDto } from './dto/create-status.dto';
import { UpdateVocabularyStatusDto } from './dto/update-status.dto';
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
    @Param('id') vocabularyId: string,
   ){
    return this.vocabularyService.getVocabularyById(vocabularyId);
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
  async deleteVocabulary(@Param('id') vocabularyId: string) {
    return this.vocabularyService.deleteVocabulary(vocabularyId);
  }

  @Get('status/:id')
  @UseGuards(JWTGuard)
  async getVocabularyStatus(@Param('id') vocabularyId: string) {
    return this.vocabularyService.getVocabularyStatus(vocabularyId);
  }
  @Get('status')
  @UseGuards(JWTGuard)
  async getAllVocabularyStatus() {
    return this.vocabularyService.getAllVocabularyStatus();
  }

  @Post('status/:id')
  @UseGuards(JWTGuard)
  async createVocabularyStatus(
    @Body() vocabularyStatus: CreateVocabularyStatusDto,
    @Param('vocabularyId') vocabularyId: string,
    @Param('userId') userId: string,
  ) {
    return this.vocabularyService.createVocabularyStatus(vocabularyStatus, vocabularyId, userId);
  }
  @Put('status/:id')
  @UseGuards(JWTGuard)
  async updateVocabularyStatus(
    @Param('id') vocabularyId: string,
    @Body() vocabularyStatus: UpdateVocabularyStatusDto,
    ) {
    return this.vocabularyService.updateVocabularyStatus(vocabularyId, vocabularyStatus);
  }
  @Delete('status/:id')
  @UseGuards(JWTGuard)
  async deleteVocabularyStatus(@Param('id') vocabularyId: string) {
    return this.vocabularyService.deleteVocabularyStatus(vocabularyId);
  }
}
