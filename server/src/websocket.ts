import { Subject } from 'rxjs';
import * as ws from 'ws';

export class AppWebsocket {
  public static wss;
  public static onconnect: Subject<any> = new Subject<any>();

  public static setWSServer(server) {
    this.wss = new ws.Server({ server });
    this.onconnect.next(this.wss);
  }
}
