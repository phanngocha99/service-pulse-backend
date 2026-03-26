import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  createdById!: number;

  @IsNumber()
  @IsNotEmpty()
  updatedById!: number;
}

class UpdateGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  updatedById!: number;
}

class DeleteGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;

  @IsNumber()
  @IsNotEmpty()
  updatedById!: number;
}

export { CreateGroupDto, UpdateGroupDto, DeleteGroupDto };
