import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.js';
import { CreateRoleDto, UpdateRoleDto, DeleteRoleDto } from './dto/role.dto.js';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async findRoleByName(name: string) {
    return this.prismaService.role.findUnique({
      where: { name },
    });
  }

  async createRole(dto: CreateRoleDto, req: LoginResponse) {
    const roleExists = await this.findRoleByName(dto.name);
    if (roleExists) {
      throw new ConflictException('Role name already taken!');
    }

    return this.prismaService.role.create({
      data: {
        name: dto.name,
        description: dto.description,
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async updateRole(dto: UpdateRoleDto, req: LoginResponse) {
    const roleExists = await this.findRoleByName(dto.name);

    if (!roleExists) {
      throw new ConflictException('Role not found!');
    }

    return this.prismaService.role.update({
      where: { name: dto.name },
      data: {
        description: dto.description,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async deleteRole(dto: DeleteRoleDto, req: LoginResponse) {
    const roleExists = await this.findRoleByName(dto.name);

    if (!roleExists) {
      throw new ConflictException('Role not found!');
    }

    return this.prismaService.role.update({
      where: { name: dto.name },
      data: {
        active: dto.active,
        updatedById: req.userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }
}
