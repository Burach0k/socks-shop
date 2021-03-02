import { Injectable } from '@nestjs/common';

import { DataBase } from '../db/index';

@Injectable()
export class SockCreatorService {

  public saveSock(name, files, userId): Promise<boolean> {
   return DataBase.client
    .query(`INSERT INTO SOCKS (name, image, daeFile, userId) VALUES ($1, $2, $3, $4);`, [name, files.screenshot[0], files.daeFile[0], userId])
    .then(() => true);
  }
}
