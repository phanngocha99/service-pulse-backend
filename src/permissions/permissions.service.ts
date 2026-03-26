import { Injectable } from '@nestjs/common';
import { RequiredPermission } from '../common/interfaces/required-permission.interface.js';
import { PrismaService } from '../common/prisma/prisma.service.js';

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
        description: true,
        active: true,
        createdAt: true,
      },
    });

    return permissions;
  }
}
