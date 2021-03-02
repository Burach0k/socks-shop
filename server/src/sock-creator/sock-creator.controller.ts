import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { SockCreatorService } from './sock-creator.service';

@Controller('sock-creator')
export class SockCreatorController {
  constructor(private sockCreatorService: SockCreatorService) {}

  @Post('/save')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'screenshot' }, { name: 'daeFile' }]))
  public saveSock(@UploadedFiles() files, @Body() sock) {
    return this.sockCreatorService.saveSock(sock.name, files, 12); //<--- fix
  }
}
