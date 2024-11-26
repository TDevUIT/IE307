/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Request as ExpressRequest } from 'express';
import { AuthGuard as JWTGuard } from '../../guard/google.guard';
import { Notification, User, VocabularyStatus } from '@prisma/client';
import { AdminAuthGuard } from '../../guard/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/dto/userDto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
  ) {}

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
  @Post('update-profile')
  @UseInterceptors(FileInterceptor('file'))
  async updateUserProfile(
    @Body() updateProfile: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log('Received profile data:', updateProfile);
    console.log('Received file:', file);
    const userId = req['user']?.id;
    if (!userId) {
      throw new Error('User not found');
    }

    const updatedProfile = await this.userService.updateProfile(updateProfile, userId, file);
    return updatedProfile;
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
  @Get()
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  @ResponseMessage('Get all users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getALLUsers();
  }
  @Post('update-rule')
  @UseGuards(JWTGuard)
  @UseGuards(AdminAuthGuard)
  @ResponseMessage('Update user rule')
  async updateUserRule(@Body() body: { userId: string; is_admin: boolean }): Promise<User> {
    return this.userService.updaterule(body.userId, body.is_admin);
  }
}
