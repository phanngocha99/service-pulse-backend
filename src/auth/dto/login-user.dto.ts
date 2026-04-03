import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+$/, {
    message:
      'Name must be lowercase, contain no spaces, and include only alphanumeric characters',
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;
}
