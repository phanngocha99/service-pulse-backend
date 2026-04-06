import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateAttachmentDto,
  UpdateAttachmentDto,
  QueryAttachmentDto,
} from './dto/attachment.dto.js';

@Injectable()
export class AttachmentsService {
  constructor(private prismaService: PrismaService) {}

  async findListAttachment(query: QueryAttachmentDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { description: { contains: search, mode: 'insensitive' as const } },
            { fileName: { contains: search, mode: 'insensitive' as const } },
            { fileType: { contains: search, mode: 'insensitive' as const } },
            { url: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.attachment.count({ where }),
      this.prismaService.attachment.findMany({
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

  async findAttachmentById(id: string) {
    const attachment = await this.prismaService.attachment.findUnique({
      where: { id },
    });
    if (!attachment) throw new NotFoundException('Attachment not found');
    return attachment;
  }

  async createAttachment(dto: CreateAttachmentDto, req: LoginResponse) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id: dto.incidentId },
    });
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return this.prismaService.attachment.create({
      data: {
        description: dto.description,
        fileName: dto.fileName,
        fileType: dto.fileType,
        fileSize: dto.fileSize,
        url: dto.url,
        incidentId: dto.incidentId,
        active: dto.active,
      },
      select: {
        id: true,
        description: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        url: true,
        incidentId: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async updateAttachment(
    id: string,
    dto: UpdateAttachmentDto,
    req: LoginResponse,
  ) {
    const attachmentExists = await this.findAttachmentById(id);
    if (!attachmentExists) {
      throw new NotFoundException('Attachment not found!');
    }

    const data: any = {
      description: dto.description,
      fileName: dto.fileName,
      fileType: dto.fileType,
      fileSize: dto.fileSize,
      url: dto.url,
      incidentId: dto.incidentId,
      active: dto.active,
      updatedById: req.userId,
    };

    return this.prismaService.attachment.update({
      where: { id },
      data,
      select: {
        id: true,
        description: true,
        fileName: true,
        fileType: true,
        fileSize: true,
        url: true,
        incidentId: true,
        active: true,
        createdAt: true,
      },
    });
  }
}
