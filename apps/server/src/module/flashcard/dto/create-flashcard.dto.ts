/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFlashcardDto {
  @IsNotEmpty()
  @IsString()
  term: string;
  @IsNotEmpty()
  @IsString()
  definition: string;
  @IsNotEmpty()
  @IsString()
  kanji: string;
}
