import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDescriptionDto } from './create-description.dto';

export class UpdateDescriptionDto extends OmitType(CreateDescriptionDto, [
  'description',
  'page',
]) {}
