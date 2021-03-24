import { HttpService, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Observable } from 'rxjs';

import { ClientChatInfo, SendEmail } from '../dto/client-helper.dto';
import { tg_url, transport_config, chat_id, from_email, email_html } from './client-helper.consts';
import { WebsocketService } from './websocket.service';

@Injectable()
export class ClientHelperService {
  private emailTransporter = nodemailer.createTransport(transport_config);

  constructor(private httpService: HttpService, private websocketService: WebsocketService) {}

  public sendMessageOnEmail(sendEmail: SendEmail): Promise<any> {
    return this.emailTransporter.sendMail({ ...sendEmail, from: from_email, html: email_html });
  }

  public createWSConnection(): void {
    this.websocketService.onMessage.subscribe(this.sendMessage);
  }

  public sendMessageToClient(replyText: string, sendText: string): void {
    const chatId: string = this.getUserIdFromTGMessgae(replyText);
    const chat = this.websocketService.getConnectionById(chatId);

    if (chat) chat.reqMessage.next(sendText);
  }

  private subscribeChat(chatId: string, connection: any): void {
    const chat = this.websocketService.getConnectionById(chatId);

    if (!chat.isStart) {
      chat.isStart = true;
      chat.reqMessage.subscribe((message) => connection.send(message));
    }
  }

  private sendMessage(connectionInfo: ClientChatInfo): void {
    const text: string = `id: ${connectionInfo.id}\n${connectionInfo.message}`;
    this.sendMessageOnTG(text).subscribe(() => this.subscribeChat(connectionInfo.id, connectionInfo.connection));
  }

  private sendMessageOnTG(text: string): Observable<any> {
    return this.httpService.post<any>(`${tg_url}/sendMessage`, { chat_id, text });
  }

  private getUserIdFromTGMessgae(message: string): string {
    return message.split('\n')[0].split(':')[1]?.trim();
  }
}
