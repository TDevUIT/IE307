/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';
import { VocabularyStatus } from '@prisma/client';
import { UpdateUserDto } from 'src/dto/userDto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService

  ) {}

  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async updateProfile(updateProfile: UpdateUserDto, userId: string, file?: Express.Multer.File) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
  
    if (!foundUser) {
      throw new Error('User not found');
    }
  
    if (file) {
      console.log('File received:', file.originalname);
      const uploadedImage = await this.cloudinaryService.uploadFile(file);
      console.log('Uploaded image:', uploadedImage);
      updateProfile.picture = uploadedImage.url;
    }
  
    return await this.prismaService.user.update({
      where: { id: userId },
      data: updateProfile,
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        is_admin: true,
        createdAt: true,
        updatedAt: true,
      },
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
