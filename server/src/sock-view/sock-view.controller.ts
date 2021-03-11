import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SockViewService } from './sock-view.service';

@Controller('sock-view')
export class SockViewController {
  constructor(private sockViewService: SockViewService) {}

  @Get(':id')
  public getSocksById(@Param() params: { id: number }) {
    return this.sockViewService.getSockById(params.id);
  }

  @Get('image/:id')
  public getImageById(@Param() params: { id: number }) {
    return this.sockViewService
      .getImageById(params.id)
      .then(this.betyaToBase64.bind(this))
  }

  @UseGuards(JwtAuthGuard)
  @Post('load')
  public loadSock(@Body() body: { offset: number; limit: number }) {
    return this.sockViewService.getNameAndImageByOffset(body);
  }

  private betyaToBase64(byteArray: string): { data: string } {
    const dataInBase64 = 'data:image/png;base64,' + Buffer.from(byteArray, 'ascii').toString('base64');

    return { data: dataInBase64 };
  }
}
