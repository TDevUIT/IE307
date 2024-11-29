/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsOptional()
  grammars?: {
    rule: string;
    description: string;
  }[];

  @IsOptional()
  vocabularies?: {
    wordJP: string;
    wordVN: string;
    kanji: string;
  }[];

  @IsOptional()
  miniTests?: {
    question: string;
    answer: string;
  }[];
  @IsOptional()
  insights?: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  @IsOptional()
  listenings?: {
    title: string;
    description: string;
    audioUrl: string;
    thumbnailUrl: string;
  }[];
}

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
