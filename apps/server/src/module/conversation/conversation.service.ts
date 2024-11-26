import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { chatSession } from 'src/utils/gemini';
import { ConversationDto } from 'src/dto/conversationDto';
import { checkResponseTypeData } from 'src/utils/check.type';

@Injectable()
export class ConversationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllConversations() {
    return await this.prismaService.conversation.findMany();
  }

  async getConversationById(conversationId: string, userId: string) {
    const conversationHistory =
      await this.prismaService.conversationHistory.findUnique({
        where: {
          conversationId_userId: { conversationId, userId },
        },
      });

    const conversation = await this.prismaService.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (!conversationHistory) {
      const defaultFirstMessage =
        this.parseJSON(conversation.defaultFirstMessage) || [];
      const initialContent = [defaultFirstMessage];
      const newConversationHistory =
        await this.prismaService.conversationHistory.create({
          data: {
            conversationId,
            userId,
            jsonContentTotals: JSON.stringify(initialContent),
            isCompleted: false,
          },
        });

      return {
        conversationDetails: this.mapConversationDetails(conversation),
        conversationHistory: newConversationHistory,
      };
    }

    return {
      conversationDetails: this.mapConversationDetails(conversation),
      conversationHistory,
    };
  }
  async createAnswer(conversation: ConversationDto, dialogueFlow: any[]) {
    const InputPromptTemplate = process.env.PROMPT_INPUT || '';
    const InputPrompt = InputPromptTemplate.replace(
      '{{scene}}',
      conversation.scene,
    )
      .replace('{{description}}', conversation.description)
      .replace('{{target}}', conversation.target)
      .replace('{{dialogue_flow}}', JSON.stringify(dialogueFlow));

    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const responseData = await chatSession.sendMessage(InputPrompt);
        const jsonResponseData = await responseData.response.text();

        const isValidResponseData =
          await checkResponseTypeData(jsonResponseData);

        if (!isValidResponseData) {
          retryCount++;
          console.warn(
            `Invalid response data, retrying ${retryCount}/${maxRetries}...`,
          );
          if (retryCount === maxRetries) {
            throw new Error(
              `Failed to validate response data after ${maxRetries} retries.`,
            );
          }
          continue;
        }
        const updateDialogueFlow = JSON.parse(jsonResponseData);
        const newDialogueFlow = [...dialogueFlow, updateDialogueFlow];

        return {
          newDialogueFlow,
          jsonResponseData,
        };
      } catch (error) {
        console.error('Error while sending message:', error);
        retryCount++;

        if (retryCount === maxRetries) {
          throw new Error('Failed to send message after multiple retries.');
        }
      }
    }
  }

  async saveConversationHistory(
    conversationId: string,
    jsonResponse: string,
    userId: string,
  ) {
    try {
      const conversationHistory =
        await this.prismaService.conversationHistory.findUnique({
          where: {
            conversationId_userId: { conversationId, userId },
          },
        });

      if (!conversationHistory) {
        throw new Error('Conversation history not found');
      }

      await this.prismaService.conversationHistory.update({
        where: { id: conversationHistory.id },
        data: { jsonContentTotals: jsonResponse },
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
      return await this.prismaService.conversation.create({
        data: {
          title: conversation.scene,
          defaultFirstMessage: JSON.stringify(defaultFirstMessage),
          target: conversation.target,
          description: conversation.description,
        },
      });
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw new Error('Failed to create conversation');
    }
  }

  private mapConversationDetails(conversation: any) {
    return {
      id: conversation.id,
      scene: conversation.title,
      target: conversation.target,
      description: conversation.description,
      defaultFirstMessage: conversation.defaultFirstMessage,
      timesToMatchTarget: conversation.timesToMatchTarget,
      jsonContent: conversation.jsonContent,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  private parseJSON(jsonString: string) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  }
}
