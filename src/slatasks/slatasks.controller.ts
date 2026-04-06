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
  CreateSLATaskDto,
  UpdateSLATaskDto,
  QuerySLATaskDto,
} from './dto/slatask.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { SLATasksService } from './slatasks.service.js';
import { SLATaskResponse } from '../common/interfaces/slatask-response.interface.js';

@Controller('slatasks')
export class SLATasksController {
  constructor(private slatasksService: SLATasksService) {}

  @Get('health')
  test() {
    return 'slatasks-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post()
  createSLATask(
    @Body(ValidationPipe) createSLATaskDto: CreateSLATaskDto,
    @Request() req,
  ): Promise<SLATaskResponse> {
    return this.slatasksService.createSLATask(createSLATaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  getListSLATask(@Query() query: QuerySLATaskDto) {
    return this.slatasksService.findListSLATask(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  getSLATask(@Param('id') id: string) {
    return this.slatasksService.findSLATaskById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Patch(':id')
  updateSLATask(
    @Param('id') id: string,
    @Body(ValidationPipe) updateSLATaskDto: UpdateSLATaskDto,
    @Request() req,
  ): Promise<SLATaskResponse> {
    return this.slatasksService.updateSLATask(id, updateSLATaskDto, req.user);
  }
}
