import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateSLATaskDto,
  UpdateSLATaskDto,
  QuerySLATaskDto,
} from './dto/slatask.dto.js';

@Injectable()
export class SLATasksService {
  constructor(private prismaService: PrismaService) {}

  async findListSLATask(query: QuerySLATaskDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.sLATask.count({ where }),
      this.prismaService.sLATask.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startTime: 'desc' },
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

  async findSLATaskById(id: string) {
    const slaTask = await this.prismaService.sLATask.findUnique({
      where: { id },
    });
    if (!slaTask) throw new NotFoundException('SLATask not found');
    return slaTask;
  }

  async createSLATask(dto: CreateSLATaskDto, req: LoginResponse) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id: dto.incidentId },
    });
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return this.prismaService.sLATask.create({
      data: {
        incidentId: dto.incidentId,
        description: dto.description,
        type: dto.type,
        startTime: dto.startTime,
        endTime: dto.endTime,
        actualEndTime: dto.actualEndTime,
        status: dto.status,
        pausedDuration: dto.pausedDuration,
        lastPausedAt: dto.lastPausedAt,
        active: true,
      },
      select: {
        id: true,
        incidentId: true,
        description: true,
        active: true,
        type: true,
        startTime: true,
        endTime: true,
        actualEndTime: true,
        status: true,
        pausedDuration: true,
        lastPausedAt: true,
      },
    });
  }

  async updateSLATask(id: string, dto: UpdateSLATaskDto, req: LoginResponse) {
    const slaTaskExists = await this.findSLATaskById(id);
    if (!slaTaskExists) {
      throw new NotFoundException('SLATask not found!');
    }

    const data: any = {
      description: dto.description,
      type: dto.type,
      startTime: dto.startTime,
      endTime: dto.endTime,
      actualEndTime: dto.actualEndTime,
      status: dto.status,
      pausedDuration: dto.pausedDuration,
      lastPausedAt: dto.lastPausedAt,
      active: dto.active,
    };

    return this.prismaService.sLATask.update({
      where: { id },
      data,
      select: {
        id: true,
        incidentId: true,
        description: true,
        active: true,
        type: true,
        startTime: true,
        endTime: true,
        actualEndTime: true,
        status: true,
        pausedDuration: true,
        lastPausedAt: true,
      },
    });
  }
}
