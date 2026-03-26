import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.ts';
import { LoginResponse } from '../common/interfaces/login-response.interface.js';
import {
  CreateGroupDto,
  UpdateGroupDto,
  DeleteGroupDto,
} from './dto/group.dto.ts';

@Injectable()
export class GroupsServices {
  constructor(private prismaService: PrismaService) {}

  async findGroupByName(name: string) {
    return this.prismaService.group.findUnique({
      where: { name },
    });
  }

  async createGroup(dto: CreateGroupDto, req: LoginResponse) {
    const groupExists = await this.findGroupByName(dto.name);
    if (groupExists) {
      throw new ConflictException('Group name already taken!');
    }

    console.log(req);

    return this.prismaService.group.create({
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

  async updateGroup(dto: UpdateGroupDto, req: LoginResponse) {
    const groupExists = await this.findGroupByName(dto.name);
    if (!groupExists) {
      throw new ConflictException('Group not found!');
    }

    return this.prismaService.group.update({
      where: { name: dto.name },
      data: {
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

  async deleteGroup(dto: DeleteGroupDto, req: LoginResponse) {
    const groupExists = await this.findGroupByName(dto.name);

    if (!groupExists) {
      throw new ConflictException('Group not found!');
    }

    return this.prismaService.group.update({
      where: { name: dto.name },
      data: {
        active: dto.active,
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
}
