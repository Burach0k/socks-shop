import { Body, Controller, HttpService, Post } from '@nestjs/common';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { SendEmail, TGSendMessage } from 'src/db/client-helper';
import { ClientHelperService } from './client-helper.service';
import { AppWebsocket } from '../websocket';

@Controller('client-helper')
export class ClientHelperController {
  public wss = AppWebsocket.wss;
  public stackConnection: { id: string, reqMessage: Subject<any> }[] = [];
  public readonly tgUrl: string = 'https://api.telegram.org/bot';
  public readonly tgtoken: string = process.env.TG_BOT_TOKEN;
  public readonly chat_id: string = process.env.TG_CHAT_ID;

  constructor(private clientHelperService: ClientHelperService, private httpService: HttpService) {

    AppWebsocket.onconnect.subscribe((wss) => {

      wss.on('connection', (connection) => {
        const id: string = uuidv4();
        this.stackConnection.push({ id, reqMessage: new Subject<any>() });

        connection.on('message', (message: any) => {
          const userId: string =  `id: ${id}\n`;
          console.log(userId, message);

          httpService.post(`${this.tgUrl}${this.tgtoken}/sendMessage`, {
            chat_id: this.chat_id,
            text: userId + message.data,
          }).subscribe(() => {
            const userInStack = this.stackConnection.find((userData) => userData.id === id);
            userInStack.reqMessage.subscribe((message) => connection.send(message));
          })
        });

        connection.on('close', () => {
          const userIndexInStack: number = this.stackConnection.findIndex((userData) => userData.id === id);
          this.stackConnection[userIndexInStack].reqMessage.unsubscribe();
          this.stackConnection.splice(userIndexInStack, 1);
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
          const userId: string = sendEmail.message.reply_to_message.text.split("\n")[0].split(":")[1];
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
