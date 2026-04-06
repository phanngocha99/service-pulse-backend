import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SLAType, SLAStatus } from '@prisma/client';

class QuerySLATaskDto {
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

class CreateSLATaskDto {
  @IsString()
  @IsNotEmpty()
  incidentId!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(SLAType)
  type!: SLAType;

  @IsNotEmpty()
  @Type(() => Date)
  startTime!: Date;

  @IsOptional()
  @Type(() => Date)
  endTime?: Date;

  @IsOptional()
  @Type(() => Date)
  actualEndTime?: Date;

  @IsOptional()
  @IsEnum(SLAStatus)
  status?: SLAStatus;

  @IsOptional()
  @Type(() => Number)
  pausedDuration?: number;

  @IsOptional()
  @Type(() => Date)
  lastPausedAt?: Date;
}

class UpdateSLATaskDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(SLAType)
  type?: SLAType;

  @IsOptional()
  @Type(() => Date)
  startTime?: Date;

  @IsOptional()
  @Type(() => Date)
  endTime?: Date;

  @IsOptional()
  @Type(() => Date)
  actualEndTime?: Date;

  @IsOptional()
  @IsEnum(SLAStatus)
  status?: SLAStatus;

  @IsOptional()
  @Type(() => Number)
  pausedDuration?: number;

  @IsOptional()
  @Type(() => Date)
  lastPausedAt?: Date;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export { CreateSLATaskDto, UpdateSLATaskDto, QuerySLATaskDto };
