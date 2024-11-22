/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMinitestDto } from './dto/create-minitest.dto';
import { UpdateMinitestDto } from './dto/update-minitest.dto';


@Injectable()
export class MinitestService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(){
    return await this.prismaService.miniTest.findMany();
  }
  async getMinitestByLessonId(lessonId: string) {
    return await this.prismaService.miniTest.findMany({
      where: { lessonId },
    });
  }
  async getMinitestById(minitestId: string) {
    return await this.prismaService.miniTest.findUnique({
      where: { id: minitestId },
    });
  }
  async createMinitest(createMinitestDto: CreateMinitestDto,lessonId: string) {
    return await this.prismaService.miniTest.create({
      data: {
        question: createMinitestDto.question,
        answer: createMinitestDto.answer,
        lessonId: lessonId,
      }
    });
  }
  async deleteMinitest(minitestId: string) {
    await this.prismaService.miniTest.delete({
      where: { id: minitestId },
    });
  }
  async updateMinitest(minitestId: string, minitest: UpdateMinitestDto) {
    return await this.prismaService.miniTest.update({
      where: { id: minitestId },
      data: {
        question: minitest.question,
        answer: minitest.answer,
      },
    });
  }

  async createBulkMinitests(data: Array<CreateMinitestDto>, lessonId: string) {
    return await this.prismaService.miniTest.createMany({
      data: data.map((minitest) => ({
        question: minitest.question,
        answer: minitest.answer,
        lessonId: lessonId,
      })),
    });
  }
  
}
