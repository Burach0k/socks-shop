import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { env } from './environments/environments';
import { AppWebsocket } from './websocket';
import { Logging } from './decorators/log.decorator';

async function bootstrap() {
  Logging.deleteLogFile();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(env.port);

  const server = app.getHttpServer();

  AppWebsocket.setWSServer(server);
}

bootstrap();
