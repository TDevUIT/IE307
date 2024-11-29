/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString } from 'class-validator';
export class CreateInsightDto {
  @IsNotEmpty()
   @IsString()
  title: string;
    @IsNotEmpty()
    @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
