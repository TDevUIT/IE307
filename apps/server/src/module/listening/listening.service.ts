/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateListeningDto } from './dto/create-listening.dto';
import { UpdateListeningDto } from './dto/update-listening.dto';

@Injectable()
export class ListeningService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.listening.findMany({
      include: {
        lesson: { include: { course: true } },
      },
    });
  }

  async getListeningByLessonId(lessonId: string) {
    return await this.prismaService.listening.findMany({
      where: { lessonId },
    });
  }

  async createListening(listening: CreateListeningDto, lessonId: string) {
    return await this.prismaService.listening.create({
      data: {
        title: listening.title,
        description: listening.description,
        audioUrl: listening.audioUrl,
        thumbnailUrl: listening.thumbnailUrl,
        lessonId: lessonId,
      },
    });
  }

  async deleteListening(id: string) {
    await this.prismaService.listening.delete({
      where: { id },
    });
  }

  async clearListening(lessonId: string) {
    await this.prismaService.listening.deleteMany({
      where: { lessonId },
    });
  }

  async updateListening(id: string, listening: UpdateListeningDto) {
    return await this.prismaService.listening.update({
      where: { id },
      data: {
        title: listening.title,
        description: listening.description,
        audioUrl: listening.audioUrl,
        thumbnailUrl: listening.thumbnailUrl,
      },
    });
  }

  async createBulkListening(data: Array<CreateListeningDto>, lessonId: string) {
    return await this.prismaService.listening.createMany({
      data: data.map((listening) => ({
        title: listening.title,
        description: listening.description,
        audioUrl: listening.audioUrl,
        thumbnailUrl: listening.thumbnailUrl,
        lessonId: lessonId,
      })),
    });
  }
}
