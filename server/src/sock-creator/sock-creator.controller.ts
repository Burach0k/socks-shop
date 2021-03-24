import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { SockFileInfo, SockFiles } from '../dto/sock-creator.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BodyWithUserId } from '../decorators/jwt.decorator';
import { SockCreatorService } from './sock-creator.service';

@Controller('sock-creator')
export class SockCreatorController {
  constructor(private sockCreatorService: SockCreatorService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/save')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'screenshot' }, { name: 'daeFile' }]))
  public saveSock(@UploadedFiles() files: SockFiles, @BodyWithUserId() sock: SockFileInfo) {
    const image = files.screenshot[0];
    const daeFile = files.daeFile[0];

    return this.sockCreatorService.saveSock(sock.name, image, daeFile, sock.currentUserId);
  }
}
