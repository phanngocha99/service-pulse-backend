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
import { GroupResponse } from '../common/interfaces/group-response.interface.js';
import { GroupsServices } from '../groups/groups.service.js';
import {
  CreateGroupDto,
  UpdateGroupDto,
  DeleteGroupDto,
} from '../groups/dto/group.dto.js';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsServices) {}

  // Check connection
  @Get('groups')
  test() {
    return 'groups-ok';
  }

  // CRUD Group Global
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'create', resource: 'group', scope: 'global', fields: ['all'] },
  ])
  @Post('/create-group')
  createGroup(
    @Body(ValidationPipe) createGroupDto: CreateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.createGroup(createGroupDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'read', resource: 'group', scope: 'global', fields: ['all'] },
  ])
  @Get('group')
  getGroup(@Request() req) {
    return req.Group;
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'update', resource: 'group', scope: 'global', fields: ['all'] },
  ])
  @Patch('update-group')
  updateGroup(
    @Body(ValidationPipe) updateGroupDto: UpdateGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.updateGroup(updateGroupDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([
    { action: 'delete', resource: 'group', scope: 'global', fields: ['all'] },
  ])
  @Patch('delete-group')
  deleteGroup(
    @Body(ValidationPipe) deleteGroupDto: DeleteGroupDto,
    @Request() req,
  ): Promise<GroupResponse> {
    return this.groupsService.deleteGroup(deleteGroupDto, req.user);
  }
}
