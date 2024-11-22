/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';
import { VocabularyStatus } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getVocabularyStatusesByUserId(
    userId: string,
  ): Promise<VocabularyStatus[]> {
    return this.prismaService.vocabularyStatus.findMany({
      where: { userId },
      include: {
        vocabulary: true,
        notifications: true,
      },
    });
  }
  async getALLUsers(){
    return await this.prismaService.user.findMany();
  }
}
