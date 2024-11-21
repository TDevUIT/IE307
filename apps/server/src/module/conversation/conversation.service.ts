import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { chatSession } from 'src/utils/gemini';
import { ConversationDto } from 'src/dto/conversationDto';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAnswer(conversation: ConversationDto, dialogueFlow: string) {
    const InputPromptTemplate = process.env.PROMPT_INPUT;
    const InputPrompt = InputPromptTemplate.replace(
      '{{scene}}',
      conversation.scene,
    )
      .replace('{{description}}', conversation.description)
      .replace('{{target}}', conversation.target)
      .replace('{{dialogue_flow}}', dialogueFlow);

    try {
      const jsonResponse = await chatSession.sendMessage(InputPrompt);
      console.log(jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error('Error while sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async saveConversationHistory(
    conversationId: string,
    jsonResponse: string,
    userId: string,
  ) {
    try {
      await this.prismaService.conversationHistory.create({
        data: {
          conversationId,
          userId,
          jsonContentTotals: JSON.stringify(jsonResponse),
          isCompleted: false,
        },
      });
      console.log('Conversation history saved successfully');
    } catch (error) {
      console.error('Error saving conversation history:', error);
      throw new Error('Failed to save conversation history');
    }
  }
}
