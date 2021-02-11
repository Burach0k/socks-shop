import { Body, Controller, Post } from '@nestjs/common';

import { SendEmail, TGSendMessage } from 'src/dto/client-helper.dto';
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
  public updateMessage(@Body() sendEmail: TGSendMessage) {
    console.log(sendEmail)
    if (sendEmail?.message?.reply_to_message) {
      const userId: string = this.clientHelperService.getUserIdFromTGMessgae(sendEmail.message.reply_to_message.text);
      console.log(userId);
      const userInStack = this.clientHelperService.correctConnections.find((userData) => userData.id === userId);
      console.log(userInStack);
      console.log(this.clientHelperService.correctConnections)

      userInStack.reqMessage.next(sendEmail.message.text);
    }

    return true;
  }
}
