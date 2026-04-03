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
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateGroupDto,
  UpdateGroupDto,
  QueryGroupDto,
} from '../groups/dto/group.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { GroupsServices } from '../groups/groups.service.js';
import { GroupResponse } from '../common/interfaces/group-response.interface.js';
import { FieldSerializerInterceptor } from '../common/interceptors/fields.permission.interceptor.js';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsServices) {}

  @Get('health')
  test() {
    return 'groups-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_GROUP])
  @Post()
  createGroup(
    @Body(ValidationPipe) createGroupDto: CreateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.createGroup(createGroupDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_GROUP])
  @Get()
  getListGroup(@Query() query: QueryGroupDto) {
    return this.groupsService.findListGroup(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_GROUP])
  @Get(':id')
  getGroup(@Param('id') id: string) {
    return this.groupsService.findGroupById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_GROUP])
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateGroupDto: UpdateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.updateGroup(id, updateGroupDto, req.user);
  }

  /// Related
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_USER])
  @UseInterceptors(FieldSerializerInterceptor)
  @Get(':id/users')
  getUsers(@Param('id') id: string) {
    return this.groupsService.getUsersByGroup(id);
  }
}
