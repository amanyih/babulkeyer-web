import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePartnerDto } from './create-partner.dto';

export class UpdatePartnerDto extends OmitType(CreatePartnerDto, [
  'image',
  'name',
]) {}
