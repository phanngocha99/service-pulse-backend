import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  Matches,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

class QueryGroupDto {
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

class CreateGroupDto {
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

class UpdateGroupDto {
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
  active?: boolean;
}

export { CreateGroupDto, UpdateGroupDto, QueryGroupDto };
