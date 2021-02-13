import { HttpService, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v1 as uuidv1 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';

import { SendEmail } from 'src/dto/client-helper.dto';
import { AppWebsocket } from '../websocket';
import { Connection } from 'src/dto/client-helper.dto';
import { tg_url, transport_config, chat_id, from_email, email_html } from './client-helper.consts';

@Injectable()
export class ClientHelperService {
  public correctConnections: Connection[] = [];
  private emailTransporter = nodemailer.createTransport(transport_config);

  constructor(private httpService: HttpService) {}

  public sendMessageOnEmail(sendEmail: SendEmail): Promise<any> {
    return this.emailTransporter.sendMail({ from: from_email, ...sendEmail, html: email_html });
  }

  private sendMessageOnTG(text: string): Observable<any> {
    return this.httpService.post<any>(`${tg_url}/sendMessage`, { chat_id, text });
  }

  public getUserIdFromTGMessgae(message: string): string {
    return message.split('\n')[0].split(':')[1].trim();
  }

  private unsubscribeChat(chatId: string): void {
    const userIndexInStack: number = this.correctConnections.findIndex((userData) => userData.id === chatId);
    this.correctConnections[userIndexInStack].reqMessage.unsubscribe();
    this.correctConnections.splice(userIndexInStack, 1);
  }

  private subscribeChat(chatId: string, connection: any): void {
    const chat = this.correctConnections.find((userData) => userData.id === chatId);

    if (!chat.isStart) {
      chat.isStart = true;
      chat.reqMessage.subscribe((message: string) => {
        if (message) connection.send(message);
      });
    }
  }

  public createWSConnection(): void {
    AppWebsocket.onconnect.subscribe((wss) => {
      wss.on('connection', (connection) => {
        const id: string = uuidv1();
        console.log(`--------------connect: ${id}-----------`);
        this.correctConnections.push({ id, reqMessage: new BehaviorSubject<string>(''), isStart: false });
        connection.on('message', (message: string) => {
          const text: string = `id: ${id}\n${message}`;
          this.sendMessageOnTG(text).subscribe(() => this.subscribeChat(id, connection));
        });

        connection.on('close', () => this.unsubscribeChat(id));
      });
    });
  }
}
