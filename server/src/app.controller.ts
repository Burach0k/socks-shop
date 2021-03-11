import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Post('auth/registration')
  async registration(@Body() user) {
    return this.authService.registration(user);
  }
}
