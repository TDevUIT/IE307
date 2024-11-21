import { PartialType } from '@nestjs/mapped-types';
export class ConversationDto {
  id: string;
  scene: string;
  target: string;
  description: string;
}

export class UpdateCourseDto extends PartialType(ConversationDto) {}
