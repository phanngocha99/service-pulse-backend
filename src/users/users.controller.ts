import {
  Controller,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Body,
  Request,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import {
  QueryUserDto,
  CreateUserDto,
  UpdateUserDto,
} from '../users/dto/user.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { UsersServices } from '../users/users.service.js';
import { UserResponse } from '../common/interfaces/user-response.interface.js';
import { FieldSerializerInterceptor } from '../common/interceptors/fields.permission.interceptor.js';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersServices) {}

  @Get('health')
  test() {
    return 'users-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_USER])
  @Post()
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Request() req,
  ): Promise<UserResponse> {
    return this.usersServices.createUser(createUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_USER])
  @Get()
  getListUser(@Query() query: QueryUserDto) {
    return this.usersServices.findListUser(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    PERMISSIONS_GLOBAL.SELFSERVICE_READ_USER,
    PERMISSIONS_GLOBAL.ADMIN_READ_USER,
  ])
  @UseInterceptors(FieldSerializerInterceptor)
  @Get('me')
  getMe(@Request() req) {
    return this.usersServices.findUserByName(req.user.username);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.SELFSERVICE_UPDATE_USER])
  @Patch('me')
  updateMe(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<UserResponse> {
    return this.usersServices.updateMe(
      req.user.userId,
      updateUserDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.SELFSERVICE_READ_GROUP])
  @UseInterceptors(FieldSerializerInterceptor)
  @Get('me/groups')
  getMyGroup(@Request() req) {
    return this.usersServices.getMyGroups(req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_USER])
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersServices.findUserById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_USER])
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<UserResponse> {
    return this.usersServices.updateUser(id, updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_USER])
  @Get(':id/groups')
  getGroups(@Param('id') id: string) {
    return this.usersServices.getGroups(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_PERMISSION])
  @Get(':id/perms')
  getRoles(@Param('id') id: string) {
    return this.usersServices.getPermissions(id);
  }
}
