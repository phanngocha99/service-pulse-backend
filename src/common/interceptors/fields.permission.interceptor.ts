import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { Permission } from '../decorators/permission.decorator.js';
import { PermissionsService } from '../../permissions/permissions.service.js';

@Injectable()
export class FieldSerializerInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requiredPermissions = this.reflector.get(
      Permission,
      context.getHandler(),
    );

    if (!requiredPermissions) {
      throw new ForbiddenException('Permission is missing');
    }
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const dbPermissions = await this.permissionsService.getPermissions(
      user.userId,
    );

    const allowedFields = new Set<string>();
    for (const perm of dbPermissions) {
      const isMatch = requiredPermissions.some(
        (required) =>
          `${required.action}:${required.resource}:${required.scope}` ===
          `${perm.action}:${perm.resource}:${perm.scope}`,
      );
      if (isMatch) perm.fields?.forEach((fields) => allowedFields.add(fields));
    }

    if (allowedFields.has('all')) return next.handle();

    return next.handle().pipe(
      map((data) => {
        if (!data || typeof data !== 'object') return data;

        const filterFields = (obj: any) => {
          const cleanObj = {};
          Object.keys(obj).forEach((key) => {
            if (allowedFields.has(key)) {
              cleanObj[key] = obj[key];
            }
          });
          return cleanObj;
        };

        return Array.isArray(data)
          ? data.map((item) => filterFields(item))
          : filterFields(data);
      }),
    );
  }
}
