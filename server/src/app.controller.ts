import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from 'pg'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect();

    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
      if (err) throw err;
      console.log('jepa');
      client.end();
    });


  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
