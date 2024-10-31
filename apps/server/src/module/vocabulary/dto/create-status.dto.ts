/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEnum, IsInt, IsDate } from 'class-validator';
import { VOCABULARY_STATUS } from '@prisma/client'; // Import the VOCABULARY_STATUS enum from Prisma

export class CreateVocabularyStatusDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  vocabularyId: string;

  @IsNotEmpty()
  @IsEnum(VOCABULARY_STATUS)
  status: VOCABULARY_STATUS;

  @IsNotEmpty()
  @IsDate()
  learnedAt: Date;

  @IsNotEmpty()
  @IsDate()
  nextReviewAt: Date;

  @IsNotEmpty()
  @IsInt()
  reviewStage: number;
}