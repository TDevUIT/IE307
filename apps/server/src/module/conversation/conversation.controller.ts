/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Param,
  Headers,
  HttpException,
  HttpStatus,
  Body,
  Req,
  Post,
} from '@nestjs/common';
import { ConversationDto } from 'src/dto/conversationDto';
import { ConversationService } from './conversation.service';
import { Request as ExpressRequest } from 'express';
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post('/create')
  async createConversation(
    @Body()
    requestBody: {
      conversation: ConversationDto;
      defaultFirstMessage: any;
    },
  ) {
    const { conversation, defaultFirstMessage } = requestBody;
    return this.conversationService.createConversation(
      conversation,
      defaultFirstMessage,
    );
  }
  @Get(':conversationId')
  async getConversationById(
    @Param('conversationId') conversationId: string,
    @Headers('userId') userId: string,
  ) {
    console.log(userId);
    try {
      if (!userId) {
        throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
      }

      const conversation = await this.conversationService.getConversationById(
        conversationId,
        userId,
      );

      if (!conversation) {
        throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
      }
      console.log(conversation);
      return conversation;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error fetching conversation details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllConversation() {
    console.log('Getting all conversations');
    return await this.conversationService.getAllConversations();
  }
  @Post('save-answer')
  async saveConversationAnswer(
    @Body() conversation: ConversationDto,
    @Body('dialogueFlow') dialogueFlow: any[],
    @Headers('userId') userId: string,
  ) {
    try {
      if (!conversation || !dialogueFlow || !Array.isArray(dialogueFlow)) {
        throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
      }
      const response = await this.conversationService.createAnswer(
        conversation,
        dialogueFlow,
      );
      await this.conversationService.saveConversationHistory(
        conversation.id,
        JSON.stringify(response.newDialogueFlow),
        userId,
      );
      return response.jsonResponseData;
    } catch (error) {
      console.error('Error saving conversation answer:', error.message);
      throw new HttpException(
        'Error saving conversation answer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
