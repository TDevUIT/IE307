/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Request as ExpressRequest } from 'express';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { Notification, VocabularyStatus } from '@prisma/client';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTGuard)
  @Get('notifications')
  @ResponseMessage('Get user notifications')
  async getNotifications(@Req() req: ExpressRequest): Promise<Notification[]> {
    const userId = req['user'].id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.userService.getNotificationsByUserId(userId);
  }

  @UseGuards(JWTGuard)
  @Get('vocabulary-statuses')
  @ResponseMessage('Get user vocabulary statuses')
  async getVocabularyStatuses(
    @Req() req: ExpressRequest,
  ): Promise<VocabularyStatus[]> {
    const userId = req['user'].id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.userService.getVocabularyStatusesByUserId(userId);
  }
}
