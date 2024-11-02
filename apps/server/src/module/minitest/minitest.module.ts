/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MinitestService } from './minitest.service';
import { MinitestController } from './minitest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MinitestController],
  providers: [MinitestService],
})
export class MinitestModule {}
