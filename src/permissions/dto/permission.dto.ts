import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryPermissionDto {
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

  @IsString()
  @IsOptional()
  action?: string;

  @IsString()
  @IsOptional()
  scope?: string;

  @IsString()
  @IsOptional()
  resource?: string;

  @IsArray()
  @IsOptional()
  fields?: string[];
}

class ReadPermissionDto {
  @IsString()
  action!: string;

  @IsString()
  scope!: string;

  @IsString()
  resource!: string;

  @IsArray()
  fields!: string[];
}

class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsString()
  @IsNotEmpty()
  scope!: string;

  @IsString()
  @IsNotEmpty()
  resource!: string;

  @IsArray()
  @IsNotEmpty()
  fields!: string[];

  @IsString()
  @IsOptional()
  label!: string;

  @IsString()
  @IsOptional()
  description!: string;
}

class UpdatePermissionDto {
  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsString()
  @IsNotEmpty()
  scope!: string;

  @IsString()
  @IsNotEmpty()
  resource!: string;

  @IsArray()
  @IsNotEmpty()
  fields!: string[];

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export {
  ReadPermissionDto,
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissionDto,
};
