import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDescriptionDto {
  @IsNotEmpty()
  @IsString()
  page: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
