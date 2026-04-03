import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  Matches,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryRoleDto {
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

class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @IsString()
  description!: string;
}

class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}

export { CreateRoleDto, UpdateRoleDto, QueryRoleDto };
