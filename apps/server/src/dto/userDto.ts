import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  name: string;
  picture: string;
  givenName?: string;
  familyName?: string;
}
export class UpdateUserDto extends PartialType(UserDto) {}
