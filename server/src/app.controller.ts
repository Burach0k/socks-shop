import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Client } from 'pg'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

    Object.keys(process.env).forEach(key => {
      console.log(key + ": " + process.env[key]);
    });

    const client = new Client({
      connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/socks_shop',
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect();

    client.query('SELECT * FROM USERS;', (err, res) => {
      if (err) throw err;
      console.log(res);
      client.end();
    });


  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
