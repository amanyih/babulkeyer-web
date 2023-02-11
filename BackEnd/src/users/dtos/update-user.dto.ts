import { OmitType } from '@nestjs/swagger';
import { createUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(createUserDto, [
  'userName',
  'password',
  'name',
] as const) {}
