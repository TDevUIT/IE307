/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GrammarController],
  providers: [GrammarService],
})
export class GrammarModule {}
