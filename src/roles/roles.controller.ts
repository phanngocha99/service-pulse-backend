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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.js';
import { RolesService } from '../roles/roles.service.js';
import {
  CreateRoleDto,
  UpdateRoleDto,
  DeleteRoleDto,
} from '../roles/dto/role.dto.js';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  // Check connection
  @Get('roles')
  test() {
    return 'roles-ok';
  }

  // CRUD Role Global
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'create', resource: 'role', scope: 'global', fields: ['all'] },
  ])
  @Post('/create-role')
  createRole(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.createRole(createRoleDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'read', resource: 'role', scope: 'global', fields: ['all'] },
  ])
  @Get('role')
  getRole(@Request() req) {
    return req.role;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'update', resource: 'role', scope: 'global', fields: ['all'] },
  ])
  @Patch('update-role')
  updateRole(
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.updateRole(updateRoleDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'delete', resource: 'role', scope: 'global', fields: ['all'] },
  ])
  @Patch('delete-role')
  deleteRole(
    @Body(ValidationPipe) deleteRoleDto: DeleteRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.deleteRole(deleteRoleDto, req.user);
  }
}
