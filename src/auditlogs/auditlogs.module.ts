import { Module } from '@nestjs/common';
import { AuditLogsController } from './auditlogs.controller.js';
import { AuditLogsService } from './auditlogs.service.js';

@Module({
  providers: [AuditLogsService],
  controllers: [AuditLogsController],
})
export class AuditLogsModule {}
