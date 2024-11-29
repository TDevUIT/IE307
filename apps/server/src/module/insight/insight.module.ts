/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InsightService } from './insight.service';
import { InsightController } from './insight.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InsightController],
  providers: [InsightService],
})
export class InsightModule {}
