import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { QueryUserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { BcryptService } from '../common/bcrypt/bcrypt.service.js';
import { AccessControlServices } from '../common/access-control/access-control.service.js';
import { LoginResponse } from '../common/interfaces/login-response.interface.js';
import { GroupResponse } from '../common/interfaces/group-response.interface.js';
import { RoleResponse } from '../common/interfaces/role-response.interface.js';
import { PermissionResponse } from '../common/interfaces/permission-response.interface.js';

@Injectable()
export class UsersServices {
  constructor(
    private bcryptService: BcryptService,
    private prismaService: PrismaService,
    private accessControlServices: AccessControlServices,
  ) {}

  async findListUser(query: QueryUserDto) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
            { label: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      this.prismaService.user.count({ where }),
      this.prismaService.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
      data,
    };
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserByName(userName: string) {
    return await this.prismaService.user.findUnique({
      where: {
        name: userName,
      },
      select: {
        id: true,
        needToResetPassword: true,
        password: true,
        label: true,
        email: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        createdById: true,
        updatedById: true,
      },
    });
  }

  async createUser(dto: CreateUserDto, req: LoginResponse) {
    const userExists = await this.findUserByName(dto.name);
    if (userExists) {
      throw new ConflictException('Name already taken!');
    }

    const hashedPassword = await this.bcryptService.hashPassword(dto.password);

    return this.prismaService.user.create({
      data: {
        name: dto.name,
        label: dto.label || dto.name,
        password: hashedPassword,
        createdById: req.userId,
        updatedById: req.userId,
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
      },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto, req: LoginResponse) {
    const userExists = await this.findUserById(id);
    if (!userExists) {
      throw new NotFoundException('User not found!');
    }

    return this.prismaService.user.update({
      where: { id },
      data: {
        label: dto.label,
        email: dto.email,
        active: dto.active,
        updatedById: req.userId,
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
      },
    });
  }

  async updateMe(id: string, dto: UpdateUserDto, req: LoginResponse) {
    const userExists = await this.findUserById(id);
    if (!userExists) {
      throw new NotFoundException('User not found!');
    }

    return this.prismaService.user.update({
      where: { id },
      data: {
        label: dto.label,
        email: dto.email,
        updatedById: req.userId,
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
      },
    });
  }

  async getMyGroups(req: LoginResponse): Promise<GroupResponse[]> {
    const userId = req.userId;
    if (!userId) return [];
    const groups = await this.accessControlServices.getGroups(userId);
    return groups;
  }

  async getGroups(id: string): Promise<GroupResponse[]> {
    const userExists = await this.findUserById(id);
    if (!userExists) {
      throw new NotFoundException('User not found!');
    }

    const groups = await this.accessControlServices.getGroups(id);
    return groups;
  }

  async getRoles(id: string): Promise<RoleResponse[]> {
    const userExists = await this.findUserById(id);
    if (!userExists) {
      throw new NotFoundException('User not found!');
    }
    const roles = await this.accessControlServices.getRoles(id);
    return roles;
  }

  async getPermissions(userId: string): Promise<PermissionResponse[]> {
    if (!userId) return [];
    const permissions = await this.accessControlServices.getPermissions(userId);
    return permissions;
  }
}
