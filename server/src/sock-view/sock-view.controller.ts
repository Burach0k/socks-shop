import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SockViewService } from './sock-view.service';
import { BodyWithUserId, ParamsWithUserId } from '../decorators/jwt.decorator';
import { SockGetParams } from '../dto/sock-get-params.dto';
import { SockViewInfo } from '../dto/sock-view-info.dto';

@Controller('sock-view')
export class SockViewController {
  constructor(private sockViewService: SockViewService) {}

  @Get(':id')
  public getSocksById(@ParamsWithUserId() params: SockGetParams): Promise<SockViewInfo> {
    return this.sockViewService
      .getSockById(+params.id)
      .then((sockInfo) => this.sockViewService.addLikesAndSubscrubesParams(sockInfo, params.currentUserId));
  }

  @Get('image/:id')
  public getImageById(@Param() params: { id: string }): Promise<JSON> {
    return this.sockViewService.getImageById(+params.id).then(this.betyaToBase64.bind(this));
  }

  @UseGuards(JwtAuthGuard)
  @Post('like')
  public like(@BodyWithUserId() sock: { id: number; currentUserId: number }) {
    return this.sockViewService
      .addLike(sock.id, sock.currentUserId)
      .then(({ likes }) => ({ likes: likes.length }));
  }

  @UseGuards(JwtAuthGuard)
  @Post('unlike')
  public unlike(@BodyWithUserId() sock: { id: number; currentUserId: number }) {
    return this.sockViewService
      .unlike(sock.id, sock.currentUserId)
      .then(({ likes }) => ({ likes: likes.length }));
  }

  @Post('load')
  public loadSock(@Body() body: { offset: number; limit: number }) {
    return this.sockViewService.getSocksByOffset(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('loadSubscribes')
  public loadSubscribes(@BodyWithUserId() request) {
    return this.sockViewService.getSubscribesByOffset(request);
  }

  private betyaToBase64(byteArray: string): { data: string } {
    const dataInBase64 = 'data:image/png;base64,' + Buffer.from(byteArray, 'ascii').toString('base64');

    return { data: dataInBase64 };
  }
}
