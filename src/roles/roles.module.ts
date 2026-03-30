import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller.js';
import { RolesService } from './roles.service.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { PermissionsService } from '../permissions/permissions.service.js';

@Module({
  providers: [RolesService, PrismaService, PermissionsService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
