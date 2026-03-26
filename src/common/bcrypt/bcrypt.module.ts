import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service.ts';

@Global()
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
