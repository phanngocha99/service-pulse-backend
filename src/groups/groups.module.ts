import { Module } from '@nestjs/common';
import { GroupsServices } from './groups.service.js';
import { GroupsController } from './groups.controller.js';

@Module({
  providers: [GroupsServices],
  controllers: [GroupsController],
})
export class GroupsModule {}
