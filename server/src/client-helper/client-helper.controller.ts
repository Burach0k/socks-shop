import { Body, Controller, HttpService, Post } from '@nestjs/common';
import { Subject } from 'rxjs';

import { SendEmail, TGSendMessage } from 'src/db/client-helper';
import { ClientHelperService } from './client-helper.service';
import { AppWebsocket } from '../websocket';

@Controller('client-helper')
export class ClientHelperController {
  public wss = AppWebsocket.wss;
  public stackConnection: { id: number, reqMessage: Subject<any> }[] = [];
  public readonly tgUrl: string = 'https://api.telegram.org/bot';
  public readonly tgtoken: string = process.env.TG_BOT_TOKEN;
  public readonly chat_id: string = process.env.TG_CHAT_ID;

  constructor(private clientHelperService: ClientHelperService, private httpService: HttpService) {

    AppWebsocket.onconnect.subscribe((wss) => {

      wss.on('connection', (connection) => {
        const id: number = this.stackConnection.length + 1;
        this.stackConnection.push({ id, reqMessage: new Subject<any>() });

        connection.on('message', (message: any) => {
          const userId = "id: " + id + '\n';

          httpService.post(`${this.tgUrl}${this.tgtoken}/sendMessage`, {
            chat_id: this.chat_id,
            text: userId + message.data,
          }).subscribe(() => {
            const userInStack = this.stackConnection.find((userData) => userData.id === id);
            userInStack.reqMessage.subscribe((message) => connection.send(message));
          })
        });
      });
    });
  }

  @Post('updateMessage')
  public updateMessage(@Body() sendEmail: TGSendMessage) {
    console.log(sendEmail);
    return new Promise((res, rej) => {
      try {
        if (sendEmail.message.reply_to_message) {
          const userId: number = +sendEmail.message.reply_to_message.text.split("\n")[0].split(":")[1];
          console.log(userId, '<=========');
          console.log(sendEmail.message.reply_to_message, '<----------');
  
          const userInStack = this.stackConnection.find((userData) => userData.id === userId);
          userInStack.reqMessage.next(sendEmail.message.text);
        } 
        res(true);
      } catch (error) {
        res(true);
      }
    });
  }

  @Post('send-email')
  public createUser(@Body() sendEmail: SendEmail) {
      return this.clientHelperService.sendMessageOnEmail(sendEmail);
  }
}
