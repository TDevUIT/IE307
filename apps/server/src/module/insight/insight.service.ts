/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';

@Injectable()
export class InsightService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.insight.findMany({
      include: {
        lesson: { include: { course: true } },
      },
    });
  }

  async getInsightByLessonId(lessonId: string) {
    return await this.prismaService.insight.findMany({
      where: { lessonId },
    });
  }

  async createInsight(insight: CreateInsightDto, lessonId: string) {
    return await this.prismaService.insight.create({
      data: {
        title: insight.title,
        description: insight.description,
        imageUrl: insight.imageUrl,
        lessonId: lessonId,
      },
    });
  }

  async deleteInsight(id: string) {
    await this.prismaService.insight.delete({
      where: { id },
    });
  }

  async clearInsight(lessonId: string) {
    await this.prismaService.insight.deleteMany({
      where: { lessonId },
    });
  }

  async updateInsight(id: string, insight: UpdateInsightDto) {
    return await this.prismaService.insight.update({
      where: { id },
      data: {
        title: insight.title,
        description: insight.description,
        imageUrl: insight.imageUrl,
      },
    });
  }

  async createBulkInsight(data: Array<CreateInsightDto>, lessonId: string) {
    return await this.prismaService.insight.createMany({
      data: data.map((insight) => ({
        title: insight.title,
        description: insight.description,
        imageUrl: insight.imageUrl,
        lessonId: lessonId,
      })),
    });
  }
}
