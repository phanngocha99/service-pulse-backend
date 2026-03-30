import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
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
    // If No Required Permissiosn then Pass
    const requiredPermissions = this.reflector.get(
      Permission,
      context.getHandler(),
    );
    if (!requiredPermissions) return true;

    // If user not found then Fail
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.userId) return false;

    // If user has permissions & field-permissions then Pass
    const dbPermissions = await this.permissionsService.getPermissions(
      user.userId,
    );
    if (!dbPermissions || dbPermissions.length === 0) return false;
    const userPermSet = new Set(
      dbPermissions.map((p: any) => `${p.action}:${p.resource}:${p.scope}`),
    );

    const hasPermissions = requiredPermissions.some((req) =>
      userPermSet.has(`${req.action}:${req.resource}:${req.scope}`),
    );

    const allAllowedFields = new Set<string>();
    let hasFieldsPermissions = false;
    for (const perm of dbPermissions) {
      const isMatch = requiredPermissions.some(
        (req) =>
          `${req.action}:${req.resource}:${req.scope}` ===
          `${perm.action}:${perm.resource}:${perm.scope}`,
      );

      if (isMatch && perm.fields) {
        perm.fields?.forEach((fields) => allAllowedFields.add(fields));
      }
    }
    // Has "All" overides
    const hasFullAccess = allAllowedFields.has('all');

    if (request.body && allAllowedFields.size > 0) {
      const bodyKeys = Object.keys(request.body);

      if (!hasFullAccess) {
        const forbiddenFields = bodyKeys.filter(
          (key) => !allAllowedFields.has(key),
        );

        if (forbiddenFields.length > 0) {
          hasFieldsPermissions = false;
          throw new ForbiddenException({
            message: 'Forbidden fields detected',
            forbiddenFields: forbiddenFields,
            allowedFields: Array.from(allAllowedFields),
          });
        } else {
          hasFieldsPermissions = true;
        }
      } else {
        hasFieldsPermissions = true;
      }
    } else if (request.body && allAllowedFields.size === 0) {
      hasFieldsPermissions = false;
      throw new ForbiddenException({
        message: 'Not have the authority to influence all fields',
        allowedFields: Array.from(allAllowedFields),
      });
    } else {
      hasFieldsPermissions = true;
    }

    return hasPermissions && hasFieldsPermissions;
  }
}
