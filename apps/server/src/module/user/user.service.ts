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

  async uploadUserAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {  id: userId.toString() },
        select: { picture: true },
      });
      if (user && user.picture) {
        const publicId = this.extractPublicIdFromUrl(user.picture);
        await this.cloudinaryService.deleteFile(publicId);
      }
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      await this.prismaService.user.update({
        where: { id: userId.toString() },
        data: { picture: uploadResult.secure_url },
      });

      return uploadResult;
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  }

  private extractPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    return publicId;
  }

  async updaterule(userId: string, is_admin: boolean) {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: { is_admin },
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
