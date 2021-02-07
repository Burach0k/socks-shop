import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppWebsocket } from './websocket';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  const server = app.getHttpServer();
  AppWebsocket.setWSServer(server);
}

bootstrap();
