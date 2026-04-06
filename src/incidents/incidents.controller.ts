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
  CreateIncidentDto,
  UpdateIncidentDto,
  QueryIncidentDto,
} from './dto/incident.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { Permission } from '../common/decorators/permission.decorator.js';
import { PERMISSIONS_GLOBAL } from '../permissions/constant/global.permissions.constant.js';
import { IncidentsService } from './incidents.service.js';
import { IncidentResponse } from '../common/interfaces/incident-response.interface.js';

@Controller('incidents')
export class IncidentsController {
  constructor(private incidentsService: IncidentsService) {}

  @Get('health')
  test() {
    return 'incidents-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_CREATE_INCIDENT])
  @Post()
  createIncident(
    @Body(ValidationPipe) createIncidentDto: CreateIncidentDto,
    @Request() req,
  ): Promise<IncidentResponse> {
    return this.incidentsService.createIncident(createIncidentDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_INCIDENT])
  @Get()
  getListIncident(@Query() query: QueryIncidentDto) {
    return this.incidentsService.findListIncident(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_READ_INCIDENT])
  @Get(':id')
  getIncident(@Param('id') id: string) {
    return this.incidentsService.findIncidentById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permission([PERMISSIONS_GLOBAL.ADMIN_UPDATE_INCIDENT])
  @Patch(':id')
  updateIncident(
    @Param('id') id: string,
    @Body(ValidationPipe) updateIncidentDto: UpdateIncidentDto,
    @Request() req,
  ): Promise<IncidentResponse> {
    return this.incidentsService.updateIncident(
      id,
      updateIncidentDto,
      req.user,
    );
  }
}
