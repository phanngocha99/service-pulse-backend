import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateGroupDto,
  UpdateGroupDto,
  QueryGroupDto,
} from './dto/group.dto.ts';
import { PrismaService } from '../common/prisma/prisma.service.ts';
import { AccessControlServices } from '../common/access-control/access-control.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.js';
import { UserResponse } from '../common/interfaces/user-response.interface.ts';

@Injectable()
export class GroupsServices {
  constructor(
    private prismaService: PrismaService,
    private accessControlServices: AccessControlServices,
  ) {}

  async findListGroup(query: QueryGroupDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { label: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.group.count({ where }),
      this.prismaService.group.findMany({
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

  async findGroupByName(groupName: string) {
    return await this.prismaService.group.findUnique({
      where: {
        name: groupName,
      },
    });
  }

  async findGroupById(id: string) {
    const group = await this.prismaService.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async createGroup(dto: CreateGroupDto, req: LoginResponse) {
    const groupExists = await this.findGroupByName(dto.name);
    if (groupExists) {
      throw new ConflictException('Group already taken!');
    }

    return this.prismaService.group.create({
      data: {
        name: dto.name,
        label: dto.label,
        description: dto.description,
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        label: true,
        description: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
        createdBy: true,
        updatedBy: true,
      },
    });
  }

  async updateGroup(id: string, dto: UpdateGroupDto, req: LoginResponse) {
    const groupExists = await this.findGroupById(id);
    if (!groupExists) {
      throw new NotFoundException('Group not found!');
    }

    return this.prismaService.group.update({
      where: { id },
      data: {
        label: dto.label,
        description: dto.description,
        active: dto.active,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        label: true,
        description: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
        createdBy: true,
        updatedBy: true,
      },
    });
  }

  async getUsersByGroup(id: string): Promise<UserResponse[]> {
    const groupExists = await this.findGroupById(id);
    if (!groupExists) {
      throw new NotFoundException('Group not found!');
    }

    const users = await this.accessControlServices.getUsersByGroup(id);
    return users;
  }
}
