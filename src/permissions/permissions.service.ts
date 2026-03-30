import { Injectable } from '@nestjs/common';
import { RequiredPermission } from '../common/interfaces/required-permission.interface.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { GroupResponse } from '../common/interfaces/group-response.interface.js';
import { UserResponse } from '../common/interfaces/user-response.interface.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.js';

@Injectable()
export class PermissionsService {
  constructor(private prismaService: PrismaService) {}

  async getPermissions(userId: number): Promise<RequiredPermission[]> {
    if (!userId) return [];
    const permissions = await this.prismaService.permission.findMany({
      where: {
        rolePermissions: {
          some: {
            role: {
              groupRoles: {
                some: {
                  group: {
                    userGroups: {
                      some: { userId: userId },
                    },
                  },
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        action: true,
        resource: true,
        scope: true,
        fields: true,
        description: true,
        active: true,
        createdAt: true,
      },
    });

    return permissions;
  }

  async getUser(userId: number): Promise<UserResponse | null> {
    if (!userId) return null;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });

    return user;
  }

  async getGroups(userId: number): Promise<GroupResponse[]> {
    if (!userId) return [];

    const groups = await this.prismaService.group.findMany({
      where: {
        userGroups: {
          some: {
            userId: userId,
          },
        },
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

    return groups;
  }

  async getRoles(userId: number): Promise<RoleResponse[]> {
    if (!userId) return [];

    const roles = await this.prismaService.role.findMany({
      where: {
        groupRoles: {
          some: {
            group: {
              userGroups: {
                some: { userId: userId },
              },
            },
          },
        },
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

    return roles;
  }
}
