import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../common/decorators/permission.decorator.ts';
import { PermissionsService } from './permissions.service.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get(
      Permission,
      context.getHandler(),
    );
    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.userId) return false;

    const dbPermissions = await this.permissionsService.getPermissions(
      user.userId,
    );

    if (!dbPermissions || dbPermissions.length === 0) return false;
    const userPermSet = new Set(
      dbPermissions.map((p: any) => `${p.action}:${p.resource}:${p.scope}`),
    );

    const hasAllPermissions = requiredPermissions.some((req) =>
      userPermSet.has(`${req.action}:${req.resource}:${req.scope}`),
    );

    return hasAllPermissions;
  }
}
