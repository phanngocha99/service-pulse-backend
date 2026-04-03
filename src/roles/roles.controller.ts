import {
  Controller,
  UseGuards,
  Query,
  Get,
  Post,
  Patch,
  Body,
  ValidationPipe,
  Request,
  Param,
} from '@nestjs/common';
import {
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto,
} from '../roles/dto/role.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { RolesService } from '../roles/roles.service.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.js';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('health')
  test() {
    return 'roles-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_ROLE])
  @Post()
  createRole(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.createRole(createRoleDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_ROLE])
  @Get()
  getListRole(@Query() query: QueryRoleDto) {
    return this.rolesService.findListRole(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_ROLE])
  @Get(':id')
  getRole(@Param('id') id: string) {
    return this.rolesService.findRoleById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_ROLE])
  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto,
    @Request() req,
  ): Promise<RoleResponse> {
    return this.rolesService.updateRole(id, updateRoleDto, req.user);
  }

  // Related
}
