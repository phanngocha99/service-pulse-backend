import { Module } from '@nestjs/common';
import { GroupsServices } from './groups.service.ts';

@Module({
  providers: [GroupsServices],
  exports: [GroupsServices],
})
export class GroupsModule {}
