import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '..//auth/local-auth.guard';
import { createUserDto } from '../dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get(':id')
  public getUserInfo(@Param() params: { id: number }): Promise<any> {
    return this.usersService.getUserInfo(params.id);
  }

  @Post('add')
  public createUser(@Body() createUserDto: createUserDto) {
    return this.authService.registration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  public authUser(@Body() createUserDto: createUserDto): any {
    return new Promise((res, rej) => {
      this.usersService.checkUser(createUserDto.name).then((user) => {
        if (user.password === createUserDto.password) {
          this.authService.login(user).then(res);
        } else {
          rej('jepa');
        }
      });
    });
  }
}
