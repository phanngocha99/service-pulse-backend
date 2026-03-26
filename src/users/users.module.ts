import { Module } from '@nestjs/common';
import { UsersServices } from './users.service.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import { BcryptService } from '../common/bcrypt/bcrypt.service.js';

@Module({
  providers: [UsersServices, BcryptService, PrismaService],
  exports: [UsersServices, PrismaService],
})
export class UsersModule {}
