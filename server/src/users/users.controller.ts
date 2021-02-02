import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from 'src/dto/users.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  public getUserInfo(@Param() params: { id: number }): Promise<any> {
    return this.usersService.getUserInfo(params.id);
  }

  @Post('add')
  public createUser(@Body() createUserDto: createUserDto) {
    const token: string = this.usersService.generateHash(createUserDto);

    return this.usersService.saveUser(createUserDto.name, token);
  }

  @Post('auth')
  public authUser(@Body() createUserDto: createUserDto) {
    const token: string = this.usersService.generateHash(createUserDto);

    return this.usersService.getUserInfoByHash(token);
  }
}
