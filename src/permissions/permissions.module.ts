import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { PermissionsController } from './permissions.controller.js';
import { PermissionsService } from './permissions.service.js';
import { PermissionGuard } from './permissions.guard.js';

@Module({
  providers: [PermissionsService, PermissionGuard, PrismaService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
