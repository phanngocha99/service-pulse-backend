import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { UserResponse } from '../common/interfaces/user-response.interface.js';
import { GroupResponse } from '../common/interfaces/group-response.interface.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.js';
import { UsersServices } from '../users/users.service.js';
import { GroupsServices } from '../groups/groups.service.js';
import { RolesService } from '../roles/roles.service.js';
import {
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
} from '../users/dto/user.dto.js';
import {
  CreateGroupDto,
  UpdateGroupDto,
  DeleteGroupDto,
} from '../groups/dto/group.dto.js';
import {
  CreateRoleDto,
  UpdateRoleDto,
  DeleteRoleDto,
} from '../roles/dto/role.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private groupsService: GroupsServices,
    private rolesService: RolesService,
    private usersServices: UsersServices,
  ) {}

  // Check connection
  @Get('test')
  test() {
    return 'authenticated-ok';
  }

  // User
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'create', resource: 'user', scope: 'global' }])
  @Post('/create-user')
  createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'read', resource: 'user', scope: 'global' }])
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'update', resource: 'user', scope: 'global' }])
  @Patch('update-user')
  updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.updateUser(updateUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'delete', resource: 'user', scope: 'global' }])
  @Patch('delete-user')
  deleteUser(
    @Body(ValidationPipe) deleteUserDto: DeleteUserDto,
  ): Promise<UserResponse> {
    return this.usersServices.deleteUser(deleteUserDto);
  }

  // Group
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'create', resource: 'group', scope: 'global' }])
  @Post('/create-group')
  createGroup(
    @Body(ValidationPipe) createGroupDto: CreateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.createGroup(createGroupDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'read', resource: 'group', scope: 'global' }])
  @Get('group')
  getGroup(@Request() req) {
    return req.Group;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'update', resource: 'group', scope: 'global' }])
  @Patch('update-Group')
  updateGroup(
    @Body(ValidationPipe) updateGroupDto: UpdateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.updateGroup(updateGroupDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'delete', resource: 'group', scope: 'global' }])
  @Patch('delete-Group')
  deleteGroup(
    @Body(ValidationPipe) deleteGroupDto: DeleteGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.deleteGroup(deleteGroupDto, req.user);
  }

  // Role
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'create', resource: 'role', scope: 'global' }])
  @Post('/create-role')
  createRole(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.createRole(createRoleDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'read', resource: 'role', scope: 'global' }])
  @Get('role')
  getRole(@Request() req) {
    return req.role;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'update', resource: 'role', scope: 'global' }])
  @Patch('update-role')
  updateRole(
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.updateRole(updateRoleDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([{ action: 'delete', resource: 'role', scope: 'global' }])
  @Patch('delete-role')
  deleteRole(
    @Body(ValidationPipe) deleteRoleDto: DeleteRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.deleteRole(deleteRoleDto, req.user);
  }
}
