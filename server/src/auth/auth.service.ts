import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Token } from '../dto/token.model';
import { createUserDto, UsersDto } from '../dto/users.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.checkUser({ name, password });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    throw 'User not found.';
  }

  async registration(user: createUserDto): Promise<Token> {
    const id = await this.usersService.saveUser(user.name, user.password);

    return { access_token: this.getToken(user.name, id) };
  }

  public login(user: UsersDto): Token {
    return { access_token: this.getToken(user.name, user.id) };
  }

  private getToken(name: string, id: number): string {
    return this.jwtService.sign({ name, id });
  }
}
