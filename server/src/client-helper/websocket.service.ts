import { Injectable } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { Subject } from 'rxjs';
import * as ws from 'ws';

import { Connection, ClientChatInfo } from '../dto/client-helper.dto';
import { AppWebsocket } from '../websocket';

@Injectable()
export class WebsocketService {
  private connectionsList: Connection[] = [];
  public onMessage: Subject<ClientChatInfo> = new Subject();

  constructor() {
    AppWebsocket.onconnect.subscribe(this.addConnectionEvent);
  }

  public getConnectionById(id: string): Connection {
    return this.connectionsList.find(connection => connection.id === id);
  }

  private addConnectionEvent(wss: ws.Server): void {
    wss.on('connection', (connection) => {
      const id: string = uuidv1();

      this.addConnectionInConnectionList(id);

      connection.on('message', (message: string) => this.onMessage.next({ id, message, connection }));
      connection.on('close', () => this.unsubscribeChat(id));
    });
  }

  private addConnectionInConnectionList(id: string): void {
    this.connectionsList.push({ id, reqMessage: new Subject<string>(), isStart: false });
  }

  private unsubscribeChat(chatId: string): void {
    const connectionIndexInStack: number = this.connectionsList.findIndex((userData) => userData.id === chatId);

    this.connectionsList[connectionIndexInStack].reqMessage.unsubscribe();
    this.connectionsList.splice(connectionIndexInStack, 1);
  }
}
