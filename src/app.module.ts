import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/config/config.module.js';
import { PrismaModule } from './common/prisma/prisma.module.ts';
import { BcryptModule } from './common/bcrypt/bcrypt.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AccessControlModule } from './common/access-control/access-control.module.js';
import { UsersModule } from './users/users.module.js';
import { GroupsModule } from './groups/groups.module.js';
import { RolesModule } from './roles/roles.module.js';
import { PermissionsModule } from './permissions/permissions.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    BcryptModule,
    AccessControlModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
