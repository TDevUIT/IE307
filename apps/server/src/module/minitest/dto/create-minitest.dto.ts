/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString } from 'class-validator';
export class CreateMinitestDto {
    @IsNotEmpty()
    @IsString()
  question: string;
    @IsNotEmpty()
    @IsString()
    answer: string;
}
