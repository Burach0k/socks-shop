import { Injectable, NestMiddleware } from '@nestjs/common';

import { DataBase } from '../db/index';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private getCorrectUrlpath(url: string): RegExp {
    let correctUrl = '';

    [...url].forEach((char) => {
      switch (char) {
        case '/':
          correctUrl += '[/]'
          break;
        case '*':
          correctUrl += '.{0,}'
          break;
        default:
          correctUrl += char;
          break;
      }
    });

    return new RegExp(correctUrl);
  }

  use(req: any, res: any, next: () => void) {

    const isExcludeUrl = ["/login", "/users/add", "/*.*" , "/assets/"].filter((url) => this.getCorrectUrlpath(url).test(req.baseUrl)).length > 0;

    if (isExcludeUrl) {
      next();
      return;
    }

    if (!req.cookies?.token) {
        res.statusCode = 401;
        next();
    } else {
      DataBase.client.query(`SELECT id FROM USERS WHERE hash = '${req.cookies.token}' LIMIT 1;`, (err, responce) => {
        if (err || !responce.rows[0]) {
          res.statusCode = 503;
          next();
        }

        next();
      });
    }
  }
}
