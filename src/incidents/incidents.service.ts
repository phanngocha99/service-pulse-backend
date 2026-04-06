import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';
import {
  CreateIncidentDto,
  UpdateIncidentDto,
  QueryIncidentDto,
} from './dto/incident.dto.js';
import { Impact, Urgency } from '@prisma/client';

@Injectable()
export class IncidentsService {
  constructor(private prismaService: PrismaService) {}

  private calculatePriority(impact: Impact, urgency: Urgency) {
    const impactScore = Number(impact.split('_')[1]);
    const urgencyScore = Number(urgency.split('_')[1]);
    return impactScore * urgencyScore;
  }

  async findListIncident(query: QueryIncidentDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      categoryId,
      subCategoryId,
    } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        {
          shortDescription: { contains: search, mode: 'insensitive' as const },
        },
        { description: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (subCategoryId) {
      where.subCategoryId = subCategoryId;
    }

    const [total, data] = await Promise.all([
      this.prismaService.incident.count({ where }),
      this.prismaService.incident.findMany({
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

  async findIncidentById(id: string) {
    const incident = await this.prismaService.incident.findUnique({
      where: { id },
    });
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async createIncident(dto: CreateIncidentDto, req: LoginResponse) {
    const category = await this.prismaService.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const subCategory = await this.prismaService.subCategory.findUnique({
      where: { id: dto.subCategoryId },
    });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    const priority = this.calculatePriority(dto.impact, dto.urgency);

    return this.prismaService.incident.create({
      data: {
        title: dto.title,
        shortDescription: dto.shortDescription,
        description: dto.description,
        categoryId: dto.categoryId,
        subCategoryId: dto.subCategoryId,
        impact: dto.impact,
        urgency: dto.urgency,
        priority,
        assignmentGroupId: dto.assignmentGroupId,
        assignedToId: dto.assignedToId,
        openedById: req.userId,
        callerId: dto.callerId,
        resolutionNotes: dto.resolutionNotes,
        resolvedAt: dto.resolvedAt,
        closedAt: dto.closedAt,
        onHoldReason: dto.onHoldReason,
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        number: true,
        active: true,
        title: true,
        shortDescription: true,
        description: true,
        status: true,
        categoryId: true,
        subCategoryId: true,
        impact: true,
        urgency: true,
        priority: true,
        assignmentGroupId: true,
        assignedToId: true,
        openedById: true,
        callerId: true,
        resolutionNotes: true,
        resolvedAt: true,
        closedAt: true,
        onHoldReason: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async updateIncident(id: string, dto: UpdateIncidentDto, req: LoginResponse) {
    const incidentExists = await this.findIncidentById(id);
    if (!incidentExists) {
      throw new NotFoundException('Incident not found!');
    }

    const impact = dto.impact ?? incidentExists.impact;
    const urgency = dto.urgency ?? incidentExists.urgency;
    const priority = this.calculatePriority(impact, urgency);

    const data: any = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      description: dto.description,
      status: dto.status,
      categoryId: dto.categoryId,
      subCategoryId: dto.subCategoryId,
      impact: dto.impact,
      urgency: dto.urgency,
      priority,
      assignmentGroupId: dto.assignmentGroupId,
      assignedToId: dto.assignedToId,
      callerId: dto.callerId,
      resolutionNotes: dto.resolutionNotes,
      resolvedAt: dto.resolvedAt,
      closedAt: dto.closedAt,
      onHoldReason: dto.onHoldReason,
      active: dto.active,
      updatedById: req.userId,
    };

    return this.prismaService.incident.update({
      where: { id },
      data,
      select: {
        id: true,
        number: true,
        active: true,
        title: true,
        shortDescription: true,
        description: true,
        status: true,
        categoryId: true,
        subCategoryId: true,
        impact: true,
        urgency: true,
        priority: true,
        assignmentGroupId: true,
        assignedToId: true,
        openedById: true,
        callerId: true,
        resolutionNotes: true,
        resolvedAt: true,
        closedAt: true,
        onHoldReason: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }
}
