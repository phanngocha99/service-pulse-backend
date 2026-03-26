import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../common/bcrypt/bcrypt.service.ts';
import { UsersServices } from '../users/users.service.ts';
import { LoginUserDto } from './dto/login-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersServices,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByName(name);

    if (
      user &&
      (await this.bcryptService.comparePassword(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: LoginUserDto) {
    const payload = {
      username: user.name,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
