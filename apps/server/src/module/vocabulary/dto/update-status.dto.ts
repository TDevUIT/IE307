/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateVocabularyStatusDto } from './create-status.dto';

export class UpdateVocabularyStatusDto extends PartialType(CreateVocabularyStatusDto) {}
