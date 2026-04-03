import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryUserDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
  })
  password!: string;

  @IsString()
  @IsOptional()
  label?: string | null;
}

class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}

export { QueryUserDto, CreateUserDto, UpdateUserDto };
