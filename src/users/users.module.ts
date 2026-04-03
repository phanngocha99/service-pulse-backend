import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersServices } from './users.service.js';

@Module({
  providers: [UsersServices],
  controllers: [UsersController],
  exports: [UsersServices],
})
export class UsersModule {}
