import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller.js';
import { IncidentsService } from './incidents.service.js';

@Module({
  providers: [IncidentsService],
  controllers: [IncidentsController],
})
export class IncidentsModule {}
