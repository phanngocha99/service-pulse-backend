import {
  Controller,
  UseGuards,
  Query,
  Get,
  Post,
  Body,
  ValidationPipe,
  Request,
  Param,
} from '@nestjs/common';
import { CreateAuditLogDto, QueryAuditLogDto } from './dto/auditlog.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { AuditLogsService } from './auditlogs.service.js';
import { AuditLogResponse } from '../common/interfaces/auditlog-response.interface.js';

@Controller('auditlogs')
export class AuditLogsController {
  constructor(private auditLogsService: AuditLogsService) {}

  @Get('health')
  test() {
    return 'auditlogs-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post()
  createAuditLog(
    @Body(ValidationPipe) createAuditLogDto: CreateAuditLogDto,
    @Request() req,
  ): Promise<AuditLogResponse> {
    return this.auditLogsService.createAuditLog(createAuditLogDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  getListAuditLog(@Query() query: QueryAuditLogDto) {
    return this.auditLogsService.findListAuditLog(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  getAuditLog(@Param('id') id: string) {
    return this.auditLogsService.findAuditLogById(id);
  }
}
