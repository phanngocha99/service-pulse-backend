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
import { AccessControlServices } from '../../common/access-control/access-control.service.js';

@Injectable()
export class FieldSerializerInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private accessControlServices: AccessControlServices,
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

    const dbPermissions = await this.accessControlServices.getPermissions(
      user.userId,
    );

    const allAllowedFields = new Set<string>();
    for (const perm of dbPermissions) {
      const isMatch = requiredPermissions.some(
        (req) =>
          `${req.action}:${req.resource}:${req.scope}` ===
          `${perm.action}:${perm.resource}:${perm.scope}`,
      );

      if (isMatch && perm.fields) {
        for (const field of perm.fields) {
          allAllowedFields.add(field);
        }
      }
    }
    if (allAllowedFields.has('all')) return next.handle();

    return next.handle().pipe(
      map((data) => {
        if (!data || typeof data !== 'object') return data;

        const filterFields = (obj: any) => {
          const resultObj = {};
          Object.keys(obj).forEach((key) => {
            if (allAllowedFields.has(key)) {
              resultObj[key] = obj[key];
            }
          });
          return resultObj;
        };

        return Array.isArray(data)
          ? data.map((item) => filterFields(item))
          : filterFields(data);
      }),
    );
  }
}
