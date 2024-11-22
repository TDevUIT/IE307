import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { chatSession } from 'src/utils/gemini';
import { ConversationDto } from 'src/dto/conversationDto';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllConversations() {
    return await this.prismaService.conversation.findMany();
  }
  async getConversationById(conversationId: string, userId: string) {
    let conversationHistory =
      await this.prismaService.conversationHistory.findFirst({
        where: {
          conversationId: conversationId,
          userId: userId,
        },
      });

    let conversationDetails = null;

    if (!conversationHistory) {
      const conversation = await this.prismaService.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      conversationDetails = {
        scene: conversation.title,
        target: conversation.target,
        description: conversation.description,
        defaultFirstMessage: conversation.defaultFirstMessage,
        timesToMatchTarget: conversation.timesToMatchTarget,
        jsonContent: conversation.jsonContent,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      };

      const defaultFirstMessage: any[] = [];
      try {
        const parsedMessage = JSON.parse(conversation.defaultFirstMessage);
        if (parsedMessage) {
          defaultFirstMessage.push(parsedMessage);
        }
      } catch (error) {
        console.error('Failed to parse defaultFirstMessage:', error);
      }
      console.log(defaultFirstMessage);
      conversationHistory = await this.prismaService.conversationHistory.create(
        {
          data: {
            conversationId: conversationId,
            userId: userId,
            jsonContentTotals: JSON.stringify(defaultFirstMessage),
            isCompleted: false,
          },
        },
      );
    } else {
      const conversation = await this.prismaService.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      conversationDetails = {
        scene: conversation.title,
        target: conversation.target,
        description: conversation.description,
      };
    }

    return {
      conversationDetails,
      conversationHistory,
    };
  }

  async createAnswer(conversation: ConversationDto, dialogueFlow: any[]) {
    const InputPromptTemplate = process.env.PROMPT_INPUT;
    const InputPrompt = InputPromptTemplate.replace(
      '{{scene}}',
      conversation.scene,
    )
      .replace('{{description}}', conversation.description)
      .replace('{{target}}', conversation.target)
      .replace('{{dialogue_flow}}', JSON.stringify(dialogueFlow));
    try {
      const responseData = await chatSession.sendMessage(InputPrompt);
      const jsonResponseData = responseData.response.text();
      const updateDialogueFlow = JSON.parse(jsonResponseData);
      const newDialogueFlow = [...dialogueFlow, updateDialogueFlow];
      console.log('New Dialogue Flow: ', newDialogueFlow);
      return {
        newDialogueFlow,
        jsonResponseData,
      };
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
      const conversationHistory =
        await this.prismaService.conversationHistory.findFirst({
          where: {
            conversationId,
            userId,
          },
        });
      await this.prismaService.conversationHistory.update({
        where: {
          id: conversationHistory.id,
        },
        data: {
          jsonContentTotals: jsonResponse,
        },
      });
      console.log('Conversation history updated successfully');
    } catch (error) {
      console.error('Error saving conversation history:', error);
      throw new Error('Failed to save conversation history');
    }
  }

  async createConversation(
    conversation: ConversationDto,
    defaultFirstMessage: any,
  ) {
    try {
      const conversationData = await this.prismaService.conversation.create({
        data: {
          title: conversation.scene,
          defaultFirstMessage: JSON.stringify(defaultFirstMessage),
          target: conversation.target,
          description: conversation.description,
        },
      });
      return conversationData;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw new Error('Failed to create conversation');
    }
  }
}
