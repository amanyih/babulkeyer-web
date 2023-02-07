import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePartnerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}
