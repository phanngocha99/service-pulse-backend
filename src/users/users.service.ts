import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { BcryptService } from '../common/bcrypt/bcrypt.service.js';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from './dto/user.dto.js';
import {
  CreateMmUserGroupDto,
  DeleteMmUserGroupDto,
} from './dto/mmUserGroup.dto.js';

@Injectable()
export class UsersServices {
  constructor(
    private bcryptService: BcryptService,
    private prismaService: PrismaService,
  ) {}

  async findUserByName(name: string) {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }

  async createUser(dto: CreateUserDto) {
    const userExists = await this.findUserByName(dto.name);
    if (userExists) {
      throw new ConflictException('Name already taken!');
    }

    const hashedPassword = await this.bcryptService.hashPassword(dto.password);

    return this.prismaService.user.create({
      data: {
        name: dto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async updateUser(dto: UpdateUserDto) {
    const userExists = await this.findUserByName(dto.name);
    if (!userExists) {
      throw new ConflictException('User not found!');
    }

    return this.prismaService.user.update({
      where: { name: dto.name },
      data: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async deleteUser(dto: DeleteUserDto) {
    const userExists = await this.findUserByName(dto.name);

    if (!userExists) {
      throw new ConflictException('User not found!');
    }

    return this.prismaService.user.update({
      where: { name: dto.name },
      data: {
        active: dto.active,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async createAssignToGroup(dto: CreateMmUserGroupDto, req) {
    const hasUser = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
    });
    const hasGroup = await this.prismaService.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!(hasUser && hasGroup)) {
      throw new ConflictException('User or Group not found');
    }
    const hasUserGroup = await this.prismaService.mMUserGroup.findUnique({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId: dto.groupId,
        },
      },
    });

    if (hasUserGroup) {
      throw new ConflictException('User was assigned to Group');
    }
    return this.prismaService.mMUserGroup.create({
      data: {
        userId: dto.userId,
        groupId: dto.groupId,
        createdById: req.user.userId,
      },
      select: {
        userId: true,
        groupId: true,
        active: true,
        createdAt: true,
        createdById: true,
      },
    });
  }

  async deleteAssignToGroup(dto: DeleteMmUserGroupDto) {
    const hasUser = await this.prismaService.user.findUnique({
      where: { id: dto.userId },
    });
    const hasGroup = await this.prismaService.group.findUnique({
      where: { id: dto.groupId },
    });
    if (!(hasUser && hasGroup)) {
      throw new ConflictException('User or Group not found');
    }

    const hasUserGroup = await this.prismaService.mMUserGroup.findUnique({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId: dto.groupId,
        },
      },
    });

    if (!hasUserGroup) {
      throw new ConflictException('User was not assigned to Group');
    }

    return this.prismaService.mMUserGroup.update({
      where: {
        userId_groupId: {
          userId: dto.userId,
          groupId: dto.groupId,
        },
      },
      data: {
        active: dto.active,
      },
      select: {
        userId: true,
        groupId: true,
        active: true,
        createdAt: true,
        createdById: true,
      },
    });
  }
}
