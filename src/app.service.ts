import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Check connection
  get(): string {
    console.log('Start ServicePulse!');
    return 'Hello ServicePulse!';
  }
}
