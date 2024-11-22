/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, UseGuards,Post, Delete,Put } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';

@Controller('flashcard')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post('bulk/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createFlashcardsBulk(
    @Param('lessonId') lessonId: string,
    @Body() createFlashcardsDto: CreateFlashcardDto[],
  ) {
    return this.flashcardService.createFlashcardsBulk(createFlashcardsDto, lessonId);
  }

  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getAll() {
    return this.flashcardService.getAll();
  }
  @Get(':lessonId')
  @UseGuards(JWTGuard)
  async getFlashcardByLessonId(@Param('lessonId') lessonId: string) {
    return this.flashcardService.getFlashcardByLessonId(lessonId);
  }
  @Get(':flashcardId')
  @UseGuards(JWTGuard)
  async getFlashcardById(@Param('flashcardId') flashcardId: string) {
    return this.flashcardService.getFlashcardById(flashcardId);
  }
  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createFlashcard(
    @Param('lessonId') lessonId: string,
    @Body() createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardService.createFlashcard(createFlashcardDto, lessonId);
  }
  @Delete(':flashcardId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteFlashcard(@Param('flashcardId') flashcardId: string) {
    return this.flashcardService.deleteFlashcard(flashcardId);
  }
  @Put(':flashcardId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async updateFlashcard(
    @Param('flashcardId') flashcardId: string,
    @Body() flashcard: UpdateFlashcardDto,
  ) {
    return this.flashcardService.updateFlashcard(flashcardId, flashcard);
  }
 

}
