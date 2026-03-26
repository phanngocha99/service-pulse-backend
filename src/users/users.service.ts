import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { BcryptService } from '../common/bcrypt/bcrypt.service.js';
import { CreateUserDto, UpdateUserDto, DeleteUserDto } from './dto/user.dto.js';

@Injectable()
export class UsersServices {
  constructor(
    private bcryptService: BcryptService,
    private prismaService: PrismaService,
  ) {}

  async findUserByName(name: string) {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }

  async createUser(dto: CreateUserDto) {
    const userExists = await this.findUserByName(dto.name);
    if (userExists) {
      throw new ConflictException('Name already taken!');
    }

    const hashedPassword = await this.bcryptService.hashPassword(dto.password);

    return this.prismaService.user.create({
      data: {
        name: dto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async updateUser(dto: UpdateUserDto) {
    const userExists = await this.findUserByName(dto.name);
    if (!userExists) {
      throw new ConflictException('User not found!');
    }

    return this.prismaService.user.update({
      where: { name: dto.name },
      data: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }

  async deleteUser(dto: DeleteUserDto) {
    const userExists = await this.findUserByName(dto.name);

    if (!userExists) {
      throw new ConflictException('User not found!');
    }

    return this.prismaService.user.update({
      where: { name: dto.name },
      data: {
        active: dto.active,
      },
      select: {
        id: true,
        email: true,
        name: true,
        needToResetPassword: true,
        active: true,
        createdAt: true,
      },
    });
  }
}
