/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { CreateListeningDto } from './dto/create-listening.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Get(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getListeningByLessonId(@Param('lessonId') lessonId: string) {
    return this.listeningService.getListeningByLessonId(lessonId);
  }

  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async getAll() {
    return this.listeningService.getAll();
  }

  @Post(':lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createListening(
    @Body() createListeningDto: CreateListeningDto,
    @Param('lessonId') lessonId: string,
  ) {
    return this.listeningService.createListening(createListeningDto, lessonId);
  }

  @Put(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async updateListening(
    @Param('id') id: string,
    @Body() updateListeningDto: UpdateListeningDto,
  ) {
    return this.listeningService.updateListening(id, updateListeningDto);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async deleteListening(@Param('id') id: string) {
    return this.listeningService.deleteListening(id);
  }

  @Post('bulk/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async createBulkListening(
    @Body() listenings: Array<CreateListeningDto>,
    @Param('lessonId') lessonId: string,
  ) {
    return this.listeningService.createBulkListening(listenings, lessonId);
  }

  @Delete('clear/:lessonId')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  async clearListening(@Param('lessonId') lessonId: string) {
    return this.listeningService.clearListening(lessonId);
  }
}
