/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
