import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  QueryPermissionDto,
  ReadPermissionDto,
} from './dto/permission.dto.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { AccessControlServices } from '../common/access-control/access-control.service.js';
import { RequiredPermission } from '../common/interfaces/required-permission.interface.ts';
import { LoginResponse } from '../common/interfaces/login-response.interface.ts';

@Injectable()
export class PermissionsService {
  constructor(
    private prismaService: PrismaService,
    private accessControlServices: AccessControlServices,
  ) {}

  async findPermisionById(id: string) {
    const perm = await this.prismaService.permission.findUnique({
      where: { id },
    });
    if (!perm) throw new NotFoundException('Permission not found');
    return perm;
  }

  async findPermision(dto: ReadPermissionDto) {
    const searchFields = dto.fields.sort();

    return await this.prismaService.permission.findUnique({
      where: {
        action_resource_scope_fields: {
          action: dto.action,
          scope: dto.scope,
          resource: dto.resource,
          fields: searchFields,
        },
      },
    });
  }

  async findListPermisions(query: QueryPermissionDto) {
    const { page = 1, limit = 10, action, scope, resource, fields } = query;
    const skip = (page - 1) * limit;

    let filterData = [
      { action: { contains: action } },
      { scope: { contains: scope } },
      { resource: { contains: resource } },
      { fields: { hasSome: fields } },
    ];

    if (fields?.includes('') || !fields) {
      filterData = [
        { action: { contains: action } },
        { scope: { contains: scope } },
        { resource: { contains: resource } },
      ];
    }
    let where = { OR: filterData };

    let [total, data] = await Promise.all([
      this.prismaService.permission.count({ where }),
      this.prismaService.permission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!action || !scope || !resource) {
      [total, data] = await Promise.all([
        this.prismaService.permission.count(),
        this.prismaService.permission.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
      ]);
    }

    return {
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
      data,
    };
  }

  async createPermission(dto: CreatePermissionDto, req: LoginResponse) {
    const permExists = await this.findPermision(dto);
    if (permExists) {
      throw new NotFoundException('Permission already existed!');
    }
    const searchFields = dto.fields.sort();
    const labelString =
      dto.action + '_' + dto.resource + '_' + dto.scope + '_' + dto.fields;
    return this.prismaService.permission.create({
      data: {
        label: dto.label || labelString,
        action: dto.action,
        resource: dto.resource,
        scope: dto.scope,
        fields: searchFields,
        description: dto.description,
        active: true,
        createdById: req.userId,
        updatedById: req.userId,
      },
      select: {
        id: true,
        label: true,
        action: true,
        resource: true,
        scope: true,
        fields: true,
        active: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async updatePermission(
    id: string,
    dto: UpdatePermissionDto,
    req: LoginResponse,
  ) {
    const permExists = await this.findPermisionById(id);
    if (!permExists) {
      throw new NotFoundException('Permission not found!');
    }
    const searchFields = dto.fields.concat('id');

    return this.prismaService.permission.update({
      where: { id },
      data: {
        label: dto.label,
        action: dto.action,
        resource: dto.resource,
        scope: dto.scope,
        fields: searchFields.sort(),
        description: dto.description,
        active: dto.active,
        updatedById: req.userId,
      },
      select: {
        id: true,
        label: true,
        action: true,
        resource: true,
        scope: true,
        fields: true,
        active: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }
}
