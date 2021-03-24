import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '..//auth/local-auth.guard';
import { createUserDto } from '../dto/users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BodyWithUserId } from '../decorators/jwt.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Get(':id')
  public getUserInfo(@Param() params: { id: number }) {
    return this.usersService.getUserInfo(params.id);
  }

  @Post('add')
  public createUser(@Body() createUserDto: createUserDto) {
    return this.authService.registration(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  public authUser(@Body() createUserDto: createUserDto) {
    return  this.usersService
      .checkUser(createUserDto)
      .then((user) => this.authService.login(user));
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscribe')
  public subscribe(@BodyWithUserId() data) {
    return this.usersService.subscribeToAuthor(data.currentUserId, data.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unsubscribe')
  public unsubscribe(@BodyWithUserId() data) {
    return this.usersService.unsubscribeToAuthor(data.currentUserId, data.userId);
  }
}
