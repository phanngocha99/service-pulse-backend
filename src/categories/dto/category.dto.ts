import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryCategoryDto {
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

class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/\?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @IsString()
  @IsOptional()
  urlProject?: string | null;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  defaultgroupId!: string;

  @IsString()
  @IsOptional()
  subCategoryId?: string;
}

class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/\?]+$/, {
    message:
      'name must be lowercase, contain no spaces, and include only alphanumeric or special characters',
  })
  name!: string;

  @IsString()
  @IsOptional()
  label?: string | null;

  @IsString()
  @IsOptional()
  urlProject?: string | null;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  defaultgroupId?: string;

  @IsString()
  @IsOptional()
  subCategoryId?: string;
}

export { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto };
