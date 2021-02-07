import { Body, Controller, HttpService, Post } from '@nestjs/common';

import { SendEmail } from 'src/db/client-helper';
import { ClientHelperService } from './client-helper.service';
import * as ws from 'ws';

@Controller('client-helper')
export class ClientHelperController {
  public wss = new ws.Server({noServer: true, port: 9000 });
  public stackConnection: any[] = [];
  public readonly tgUrl: string = 'https://api.telegram.org/bot';
  public readonly tgtoken: string = process.env.TG_BOT_TOKEN;
  public readonly chat_id: string = process.env.TG_CHAT_ID;

  constructor(private clientHelperService: ClientHelperService, private httpService: HttpService) {

    this.wss.onconnection = (connection) => {
      connection.onmessage = (message) => {
        httpService.post(`${this.tgUrl}${this.tgtoken}/sendMessage`, {
            chat_id: this.chat_id,
            text: message.data,
        }).subscribe(() => {})
      };
    };
  }

  @Post('updateMessage')
  public updateMessage(@Body() sendEmail: SendEmail) {
    console.log(sendEmail)
    return true;
  }

  @Post('send-email')
  public createUser(@Body() sendEmail: SendEmail) {
      return this.clientHelperService.sendMessageOnEmail(sendEmail);
  }
}
