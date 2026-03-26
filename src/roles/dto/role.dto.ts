import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

class CreateRoleDto {
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

class UpdateRoleDto {
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

class DeleteRoleDto {
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

export { CreateRoleDto, UpdateRoleDto, DeleteRoleDto };
