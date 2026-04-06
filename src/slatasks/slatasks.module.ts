import { Module } from '@nestjs/common';
import { SLATasksController } from './slatasks.controller.js';
import { SLATasksService } from './slatasks.service.js';

@Module({
  providers: [SLATasksService],
  controllers: [SLATasksController],
})
export class SLATasksModule {}
