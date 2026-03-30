import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

class CreateMmUserGroupDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  groupId!: number;
}

class DeleteMmUserGroupDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  groupId!: number;

  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;
}
export { CreateMmUserGroupDto, DeleteMmUserGroupDto };
