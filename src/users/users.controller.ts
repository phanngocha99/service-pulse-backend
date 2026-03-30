import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { FieldSerializerInterceptor } from '../common/interceptors/fields.permission.interceptor.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { UserResponse } from '../common/interfaces/user-response.interface.js';
import { MmUserGroupResponse } from '../common/interfaces/mmUserGroup-response.interface.js';
import { UsersServices } from '../users/users.service.js';
import {
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
} from '../users/dto/user.dto.js';
import {
  CreateMmUserGroupDto,
  DeleteMmUserGroupDto,
} from './dto/mmUserGroup.dto.ts';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersServices) {}

  // Check connection
  @Get('users')
  test() {
    return 'users-ok';
  }

  //   CRUD User Global
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_USER])
  @Post('/create-user')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_USER])
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersServices.findUserByName(req.user.username);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_USER])
  @Patch('update-user')
  updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.updateUser(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_DELETE_USER])
  @Patch('delete-user')
  deleteUser(
    @Body(ValidationPipe) deleteUserDto: DeleteUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.deleteUser(deleteUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_MMUSERGROUP])
  @Patch('create-mmUserGroup')
  createMmUserGroup(
    @Body(ValidationPipe) createMmUserGroupDto: CreateMmUserGroupDto,
    @Request() req,
  ): Promise<MmUserGroupResponse> {
    return this.usersServices.createAssignToGroup(createMmUserGroupDto, req);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_DELETE_MMUSERGROUP])
  @Patch('delete-mmUserGroup')
  deleteMmUserGroup(
    @Body(ValidationPipe) deleteMmUserGroupDto: DeleteMmUserGroupDto,
  ): Promise<MmUserGroupResponse> {
    return this.usersServices.deleteAssignToGroup(deleteMmUserGroupDto);
  }

  // RU User Me

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ME_READ_USER])
  @UseInterceptors(FieldSerializerInterceptor)
  @Get('me')
  getMe(@Request() req) {
    return this.usersServices.findUserByName(req.user.username);
  }
}
