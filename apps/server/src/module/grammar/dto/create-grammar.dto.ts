/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString } from 'class-validator';
export class CreateGrammarDto {
  @IsNotEmpty()
   @IsString()
  rule: string;
    @IsNotEmpty()
    @IsString()
  description: string;
}
