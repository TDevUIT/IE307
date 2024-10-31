/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateVocabularyDto {
  @IsNotEmpty()
  @IsString()
  wordJP: string;
  @IsNotEmpty()
  @IsString()
  wordVN: string;
  @IsNotEmpty()
  @IsString()
  kanji: string;
}
