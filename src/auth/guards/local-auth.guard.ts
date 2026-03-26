import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (info) {
      console.log('Error:', info.message);
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
