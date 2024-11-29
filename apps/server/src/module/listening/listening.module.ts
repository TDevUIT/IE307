/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ListeningService } from './listening.service';
import { ListeningController } from './listening.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ListeningController],
  providers: [ListeningService],
})
export class ListeningModule {}
