import { Subject } from 'rxjs';
import * as ws from 'ws';

export class AppWebsocket {
  public static wss: ws.Server;
  public static onconnect: Subject<ws.Server> = new Subject<ws.Server>();

  public static setWSServer(server) {
    this.wss = new ws.Server({ server });
    this.onconnect.next(this.wss);
  }
}
