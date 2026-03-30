import { Module } from '@nestjs/common';
import { GroupsServices } from './groups.service.js';
import { GroupsController } from './groups.controller.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { PermissionsService } from '../permissions/permissions.service.js';

@Module({
  providers: [GroupsServices, PrismaService, PermissionsService],
  controllers: [GroupsController],
  exports: [GroupsServices],
})
export class GroupsModule {}
