import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IncidentStatus, Impact, Urgency, OnHoldReason } from '@prisma/client';

class QueryIncidentDto {
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

  @IsOptional()
  @IsEnum(IncidentStatus)
  status?: IncidentStatus;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  subCategoryId?: string;
}

class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  shortDescription!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  subCategoryId!: string;

  @IsEnum(Impact)
  impact!: Impact;

  @IsEnum(Urgency)
  urgency!: Urgency;

  @IsString()
  @IsOptional()
  assignmentGroupId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsString()
  @IsOptional()
  callerId?: string;

  @IsString()
  @IsOptional()
  resolutionNotes?: string;

  @IsOptional()
  @Type(() => Date)
  resolvedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  closedAt?: Date;

  @IsOptional()
  @IsEnum(OnHoldReason)
  onHoldReason?: OnHoldReason;
}

class UpdateIncidentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(IncidentStatus)
  status?: IncidentStatus;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  subCategoryId?: string;

  @IsOptional()
  @IsEnum(Impact)
  impact?: Impact;

  @IsOptional()
  @IsEnum(Urgency)
  urgency?: Urgency;

  @IsString()
  @IsOptional()
  assignmentGroupId?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsString()
  @IsOptional()
  callerId?: string;

  @IsString()
  @IsOptional()
  resolutionNotes?: string;

  @IsOptional()
  @Type(() => Date)
  resolvedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  closedAt?: Date;

  @IsOptional()
  @IsEnum(OnHoldReason)
  onHoldReason?: OnHoldReason;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export { CreateIncidentDto, UpdateIncidentDto, QueryIncidentDto };
