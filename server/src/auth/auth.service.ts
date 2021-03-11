import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.checkUser(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async registration(user: any) {
    const id = await this.usersService.saveUser(user.name, user.password);

    return {
      access_token: this.getToken(user.name, id),
    };
  }

  async login(user: any) {
    // console.log(this.jwtService.verify(jwtttt, { secret: 'secretKey' }));
    return {
      access_token: this.getToken(user.name, user.id),
    };
  }

  private getToken(name: string, id: number) {
    return this.jwtService.sign({ name, id });
  }
}
