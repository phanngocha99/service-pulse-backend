import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.js';
import { CreateRoleDto, UpdateRoleDto, QueryRoleDto } from './dto/role.dto.js';
import { AccessControlServices } from '../common/access-control/access-control.service.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.ts';

@Injectable()
export class RolesService {
  constructor(
    private prismaService: PrismaService,
    private accessControlServices: AccessControlServices,
  ) {}

  async findRoleByName(roleName: string) {
    return this.prismaService.role.findUnique({
      where: {
        name: roleName,
      },
    });
  }

  async findRoleById(id: string) {
    const role = await this.prismaService.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async findListRole(query: QueryRoleDto) {
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
      this.prismaService.role.count({ where }),
      this.prismaService.role.findMany({
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

  async createRole(dto: CreateRoleDto, req: LoginResponse) {
    const roleExists = await this.findRoleByName(dto.name);
    if (roleExists) {
      throw new ConflictException('Role name already taken!');
    }

    return this.prismaService.role.create({
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
        updatedBy: true,
        createdBy: true,
      },
    });
  }

  async updateRole(id: string, dto: UpdateRoleDto, req: LoginResponse) {
    const roleExists = await this.findRoleById(id);

    if (!roleExists) {
      throw new NotFoundException('Role not found!');
    }

    return this.prismaService.role.update({
      where: { id },
      data: {
        description: dto.description,
        updatedById: req.userId,
        label: dto.label,
        active: dto.active,
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
        updatedBy: true,
        createdBy: true,
      },
    });
  }
}
