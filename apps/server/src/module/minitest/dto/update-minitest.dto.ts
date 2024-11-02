import { PartialType } from '@nestjs/swagger';
import { CreateMinitestDto } from './create-minitest.dto';

export class UpdateMinitestDto extends PartialType(CreateMinitestDto) {}
