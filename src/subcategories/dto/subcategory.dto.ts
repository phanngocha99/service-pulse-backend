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

class QuerySubCategoryDto {
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

class CreateSubCategoryDto {
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
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;
}

class UpdateSubCategoryDto {
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
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export { CreateSubCategoryDto, UpdateSubCategoryDto, QuerySubCategoryDto };
