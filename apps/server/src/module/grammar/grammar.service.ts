/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';

@Injectable()
export class GrammarService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(){
    return await this.prismaService.grammar.findMany({
      include: {
        lesson: { include: { course: true } },
      },
    });
  }

  async getGrammarByLessonId(lessonId: string) {
    return await this.prismaService.grammar.findMany({
      where: { lessonId },
    });
  }
  async createGrammar(grammar: CreateGrammarDto, lessonId: string) {
    return await this.prismaService.grammar.create({
      data: {
        rule: grammar.rule,
        description: grammar.description,
        lessonId: lessonId,
      },
    });
  }
    async deleteGrammar(id: string) {
        await this.prismaService.grammar.delete({
        where: { id },
        });
    }
    async updateGrammar(id: string, grammar: UpdateGrammarDto) {
        return await this.prismaService.grammar.update({
        where: { id },
        data: {
            rule: grammar.rule,
            description: grammar.description,
        },
        });
    }
}
