import { HttpModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBase } from './db/index';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ClientHelperController } from './client-helper/client-helper.controller';
import { ClientHelperService } from './client-helper/client-helper.service';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static', 'dist', 'socks-shop'),
    }),
  ],
  controllers: [AppController, UsersController, ClientHelperController],
  providers: [AppService, UsersService, ClientHelperService],
})
export class AppModule implements NestModule {
  constructor() {
    DataBase.client.connect();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*')
  }
}
