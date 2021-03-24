import { HttpModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBase } from './db/index';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ClientHelperController } from './client-helper/client-helper.controller';
import { ClientHelperService } from './client-helper/client-helper.service';
import { SockCreatorController } from './sock-creator/sock-creator.controller';
import { SockCreatorService } from './sock-creator/sock-creator.service';
import { SockViewController } from './sock-view/sock-view.controller';
import { SockViewService } from './sock-view/sock-view.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketService } from './client-helper/websocket.service';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static', 'dist', 'socks-shop'),
    }),
    AuthModule,
  ],
  controllers: [AppController, UsersController, ClientHelperController, SockCreatorController, SockViewController],
  providers: [AppService, UsersService, ClientHelperService, SockCreatorService, SockViewService, WebsocketService],
})
export class AppModule {
  constructor() {
    DataBase.client.connect();
  }
}
