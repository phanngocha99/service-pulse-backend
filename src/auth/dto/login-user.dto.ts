import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  id!: string;
}
