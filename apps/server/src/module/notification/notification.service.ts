/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from 'src/dto/notificationDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

enum NOTIFICATION_STATUS {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

@Injectable()
export class NotificationsService {
  private expo = new Expo();

  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll() {
    return await this.prisma.notification.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.notification.delete({
      where: { id },
    });
  }

  private async sendPushNotification(expoPushToken: string, message: string) {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.error(`Invalid Expo push token: ${expoPushToken}`);
      return;
    }
    const messages: ExpoPushMessage[] = [
      {
        to: expoPushToken,
        sound: 'default',
        body: message,
        data: { withSome: 'data' },
      },
    ];
    try {
      const ticket = await this.expo.sendPushNotificationsAsync(messages);
      console.log('Push notification sent:', ticket);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  async sendNotification(notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      include: { user: true },
    });
    if (notification && notification.user && notification.user.pushToken) {
      try {
        await this.sendPushNotification(
          notification.user.pushToken,
          notification.message,
        );
        await this.prisma.notification.update({
          where: { id: notificationId },
          data: { status: NOTIFICATION_STATUS.SENT },
        });
      } catch (error) {
        console.error('Failed to send notification:', error);
        await this.prisma.notification.update({
          where: { id: notificationId },
          data: { status: NOTIFICATION_STATUS.FAILED },
        });
      }
    } else {
      console.error('Notification or push token not found');
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handlePendingNotifications() {
    const pendingNotifications = await this.prisma.notification.findMany({
      where: { status: NOTIFICATION_STATUS.PENDING },
    });

    for (const notification of pendingNotifications) {
      await this.sendNotification(notification.id);
    }
  }
}
