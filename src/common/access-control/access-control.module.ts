import { Global, Module } from '@nestjs/common';
import { AccessControlServices } from './access-control.service.js';
import { PermissionsModule } from '../../permissions/permissions.module.js';
@Global()
@Module({
  imports: [PermissionsModule],
  providers: [AccessControlServices],
  exports: [AccessControlServices],
})
export class AccessControlModule {}
