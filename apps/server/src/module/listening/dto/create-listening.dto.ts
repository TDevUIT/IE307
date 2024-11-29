/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString } from 'class-validator';
export class CreateListeningDto {
  @IsNotEmpty()
   @IsString()
  title: string;
    @IsNotEmpty()
    @IsString()
  description: string;
  @IsNotEmpty()
    @IsString()
    audioUrl: string;
    @IsNotEmpty()
    @IsString()
    thumbnailUrl: string;
}
