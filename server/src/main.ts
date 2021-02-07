import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ws from 'ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  const server = app.getHttpServer();
  const wss = new ws.Server({ server });

  wss.on('connection', (connection) => { console.log('===================================================================================')});
}

bootstrap();
