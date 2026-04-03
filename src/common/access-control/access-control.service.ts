import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { GroupResponse } from '../interfaces/group-response.interface.js';
import { PermissionResponse } from '../interfaces/permission-response.interface.js';
import { RoleResponse } from '../interfaces/role-response.interface.js';
import { UserResponse } from '../interfaces/user-response.interface.js';

@Injectable()
export class AccessControlServices {
  constructor(private prismaService: PrismaService) {}

  async getPermissions(userId: string): Promise<PermissionResponse[]> {
    if (!userId) return [];
    const permissions = await this.prismaService.permission.findMany({
      where: {
        active: true,
        rolePermissions: {
          some: {
            active: true,
            rolePerm: {
              groupRoles: {
                some: {
                  active: true,
                  groupRole: {
                    userGroups: {
                      some: {
                        userId: userId,
                        active: true,
                      },
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
        label: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
        updatedBy: true,
        createdBy: true,
      },
    });

    return permissions;
  }

  async getGroups(userId: string): Promise<GroupResponse[]> {
    if (!userId) return [];

    const groups = await this.prismaService.group.findMany({
      where: {
        userGroups: {
          some: {
            userId: userId,
            active: true,
          },
        },
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

    return groups;
  }

  async getRoles(userId: string): Promise<RoleResponse[]> {
    if (!userId) return [];

    const roles = await this.prismaService.role.findMany({
      where: {
        active: true, // Standard practice to only fetch active roles
        groupRoles: {
          some: {
            active: true,
            groupRole: {
              userGroups: {
                some: {
                  userId: userId,
                  active: true,
                },
              },
            },
          },
        },
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

    return roles;
  }

  async getRolesByGroup(groupId: string): Promise<RoleResponse[]> {
    if (!groupId) return [];

    const roles = await this.prismaService.role.findMany({
      where: {
        groupRoles: {
          some: { groupId: groupId, active: true },
        },
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

    return roles;
  }

  async getUsersByGroup(groupId: string): Promise<UserResponse[]> {
    if (!groupId) return [];

    const users = await this.prismaService.user.findMany({
      where: {
        userGroups: {
          some: { groupId: groupId, active: true },
        },
      },
      select: {
        id: true,
        needToResetPassword: true,
        label: true,
        email: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
        updatedBy: true,
        createdBy: true,
      },
    });

    return users;
  }
}
