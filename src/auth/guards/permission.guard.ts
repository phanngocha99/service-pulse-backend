import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get(Permission, context.getHandler());
    if (!permissions) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.permissions) return false;
    return permissions.some((permissions) =>
      user.permissions.includes(permissions),
    );
  }
}
