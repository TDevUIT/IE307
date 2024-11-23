/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';

@Controller('grammar')
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Get(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getGrammarByLessonId(@Param('lessonId') lessonId: string) {
    return this.grammarService.getGrammarByLessonId(lessonId);
  }
  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getAll() {
    return this.grammarService.getAll();
  }
  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createGrammar(
    @Body() createGrammarDto: CreateGrammarDto,
    @Param('lessonId') lessonId: string,
  ) {
    return this.grammarService.createGrammar(createGrammarDto, lessonId);
  }
  @Put(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async updateGrammar(
    @Param('id') id: string,
    @Body() updateGrammarDto: UpdateGrammarDto,
  ) {
    return this.grammarService.updateGrammar(id, updateGrammarDto);
  }
  @Delete(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteGrammar(@Param('id') id: string) {
    return this.grammarService.deleteGrammar(id);
  }
  @Post('bulk/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createBulkGrammar(
    @Body() grammars: Array<CreateGrammarDto>,
    @Param('lessonId') lessonId: string,
  ) {
    return this.grammarService.createBulkGrammar(grammars, lessonId);
  }
  @Delete('clear/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async clearGrammar(@Param('lessonId') lessonId: string) {
    return this.grammarService.clearGrammar(lessonId);
  }
}
