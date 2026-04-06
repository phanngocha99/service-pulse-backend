import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateCommentDto,
  UpdateCommentDto,
  QueryCommentDto,
} from './dto/comment.dto.js';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async findListComment(query: QueryCommentDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [{ text: { contains: search, mode: 'insensitive' as const } }],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.comment.count({ where }),
      this.prismaService.comment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
      data,
    };
  }

  async findCommentById(id: string) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async createComment(dto: CreateCommentDto, req: LoginResponse) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id: dto.incidentId },
    });
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return this.prismaService.comment.create({
      data: {
        text: dto.text,
        isInternal: dto.isInternal,
        incidentId: dto.incidentId,
        createdById: req.userId,
      },
      select: {
        id: true,
        text: true,
        isInternal: true,
        incidentId: true,
        active: true,
        createdAt: true,
        createdById: true,
      },
    });
  }

  async updateComment(id: string, dto: UpdateCommentDto, req: LoginResponse) {
    const commentExists = await this.findCommentById(id);
    if (!commentExists) {
      throw new NotFoundException('Comment not found!');
    }

    const data: any = {
      text: dto.text,
      isInternal: dto.isInternal,
      active: dto.active,
    };

    return this.prismaService.comment.update({
      where: { id },
      data,
      select: {
        id: true,
        text: true,
        isInternal: true,
        incidentId: true,
        active: true,
        createdAt: true,
        createdById: true,
      },
    });
  }
}
