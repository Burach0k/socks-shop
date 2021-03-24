import { Body, Controller, Post } from '@nestjs/common';

import { SendEmail, TGSendMessage } from '../dto/client-helper.dto';
import { ClientHelperService } from './client-helper.service';

@Controller('client-helper')
export class ClientHelperController {
  constructor(private clientHelperService: ClientHelperService) {
    clientHelperService.createWSConnection();
  }

  @Post('send-email')
  public createUser(@Body() sendEmail: SendEmail) {
    return this.clientHelperService.sendMessageOnEmail(sendEmail);
  }

  @Post('updateMessage')
  public updateMessage(@Body() sendEmail: TGSendMessage): boolean {
    const replyText: string = sendEmail?.message?.reply_to_message?.text;

    if (replyText) {
      const sendText = sendEmail.message.text;
      this.clientHelperService.sendMessageToClient(replyText, sendText);
    }

    return true;
  }
}
