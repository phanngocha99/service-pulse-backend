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
  CreateAttachmentDto,
  UpdateAttachmentDto,
  QueryAttachmentDto,
} from './dto/attachment.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { AttachmentsService } from './attachments.service.js';
import { AttachmentResponse } from '../common/interfaces/attachment-response.interface.js';

@Controller('attachments')
export class AttachmentsController {
  constructor(private attachmentsService: AttachmentsService) {}

  @Get('health')
  test() {
    return 'attachments-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post()
  createAttachment(
    @Body(ValidationPipe) createAttachmentDto: CreateAttachmentDto,
    @Request() req,
  ): Promise<AttachmentResponse> {
    return this.attachmentsService.createAttachment(
      createAttachmentDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  getListAttachment(@Query() query: QueryAttachmentDto) {
    return this.attachmentsService.findListAttachment(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  getAttachment(@Param('id') id: string) {
    return this.attachmentsService.findAttachmentById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Patch(':id')
  updateAttachment(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAttachmentDto: UpdateAttachmentDto,
    @Request() req,
  ): Promise<AttachmentResponse> {
    return this.attachmentsService.updateAttachment(
      id,
      updateAttachmentDto,
      req.user,
    );
  }
}
