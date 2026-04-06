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
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentDto,
} from './dto/comment.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { PermissionGuard } from '../permissions/permissions.guard.js';
import { CommentsService } from './comments.service.js';
import { CommentResponse } from '../common/interfaces/comment-response.interface.js';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('health')
  test() {
    return 'comments-ok';
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post()
  createComment(
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @Request() req,
  ): Promise<CommentResponse> {
    return this.commentsService.createComment(createCommentDto, req.user);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  getListComment(@Query() query: QueryCommentDto) {
    return this.commentsService.findListComment(query);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  getComment(@Param('id') id: string) {
    return this.commentsService.findCommentById(id);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Patch(':id')
  updateComment(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCommentDto: UpdateCommentDto,
    @Request() req,
  ): Promise<CommentResponse> {
    return this.commentsService.updateComment(id, updateCommentDto, req.user);
  }
}
