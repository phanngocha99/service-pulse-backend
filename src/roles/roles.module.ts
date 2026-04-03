import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller.js';
import { RolesService } from './roles.service.js';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
