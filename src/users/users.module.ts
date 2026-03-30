import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersServices } from './users.service.js';
import { BcryptService } from '../common/bcrypt/bcrypt.service.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { PermissionsService } from '../permissions/permissions.service.js';

@Module({
  providers: [UsersServices, BcryptService, PrismaService, PermissionsService],
  controllers: [UsersController],
  exports: [UsersServices],
})
export class UsersModule {}
