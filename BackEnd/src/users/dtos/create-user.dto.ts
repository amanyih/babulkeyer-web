import { IsEmail, IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
