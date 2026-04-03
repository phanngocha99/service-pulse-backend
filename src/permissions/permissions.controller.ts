import {
  Controller,
  Query,
  Get,
  Post,
  Patch,
  Request,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissionDto,
} from './dto/permission.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { PermissionsService } from './permissions.service.ts';
import { PermissionResponse } from '../common/interfaces/permission-response.interface.js';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsServices: PermissionsService) {}

  @Get('health')
  test() {
    return 'permissions-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_PERMISSION])
  @Post()
  createPermission(
    @Request() req,
    @Body(ValidationPipe) createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponse> {
    return this.permissionsServices.createPermission(
      createPermissionDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_PERMISSION])
  @Get('')
  getListPermission(@Query() queryPermissionDto: QueryPermissionDto) {
    return this.permissionsServices.findListPermisions(queryPermissionDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_PERMISSION])
  @Get(':id')
  getPermission(@Param('id') id: string) {
    return this.permissionsServices.findPermisionById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_PERMISSION])
  @Patch(':id')
  updatePermission(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePermissionDto: UpdatePermissionDto,
    @Request() req,
  ): Promise<PermissionResponse> {
    return this.permissionsServices.updatePermission(
      id,
      updatePermissionDto,
      req.user,
    );
  }

  // Relationship
}
