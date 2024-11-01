/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardController } from './flashcard.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
