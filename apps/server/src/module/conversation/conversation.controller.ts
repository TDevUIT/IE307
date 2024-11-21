import { Controller, Post, Body, Req } from '@nestjs/common';
import { ConversationDto } from 'src/dto/conversationDto';
import { ConversationService } from './conversation.service';
import { Request as ExpressRequest } from 'express';
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('save-answer')
  async saveConversationAnswer(
    @Body() conversation: ConversationDto,
    @Body('dialogueFlow') dialogueFlow: string,
    @Req() req: ExpressRequest,
  ) {
    const response = await this.conversationService.createAnswer(
      conversation,
      dialogueFlow,
    );
    const userId = req['user'].id;
    await this.conversationService.saveConversationHistory(
      conversation.id,
      response,
      userId,
    );
    return response;
  }
}
