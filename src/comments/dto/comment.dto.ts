import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class QueryCommentDto {
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

class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean = false;

  @IsString()
  @IsNotEmpty()
  incidentId!: string;
}

class UpdateCommentDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export { CreateCommentDto, UpdateCommentDto, QueryCommentDto };
