import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import { CreateAuditLogDto, QueryAuditLogDto } from './dto/auditlog.dto.js';

@Injectable()
export class AuditLogsService {
  constructor(private prismaService: PrismaService) {}

  async findListAuditLog(query: QueryAuditLogDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { fieldName: { contains: search, mode: 'insensitive' as const } },
            { oldValue: { contains: search, mode: 'insensitive' as const } },
            { newValue: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.auditLog.count({ where }),
      this.prismaService.auditLog.findMany({
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

  async findAuditLogById(id: string) {
    const auditLog = await this.prismaService.auditLog.findUnique({
      where: { id },
    });
    if (!auditLog) throw new NotFoundException('AuditLog not found');
    return auditLog;
  }

  async createAuditLog(dto: CreateAuditLogDto, req: LoginResponse) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id: dto.incidentId },
    });
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return this.prismaService.auditLog.create({
      data: {
        fieldName: dto.fieldName,
        oldValue: dto.oldValue,
        newValue: dto.newValue,
        incidentId: dto.incidentId,
        createdById: req.userId,
      },
      select: {
        id: true,
        fieldName: true,
        oldValue: true,
        newValue: true,
        incidentId: true,
        createdAt: true,
        createdById: true,
      },
    });
  }
}
