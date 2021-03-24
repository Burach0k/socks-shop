import { Injectable } from '@nestjs/common';

import { DataBase } from '../db/index';

@Injectable()
export class SockCreatorService {
  public saveSock(name: string, image: Blob, daeFile: Blob, userId: number): Promise<boolean> {
    return DataBase.client
      .query(`INSERT INTO SOCKS (name, image, daeFile, userId, likes) VALUES ($1, $2, $3, $4, $5);`, [name, image, daeFile, userId, []])
      .then(() => true);
  }
}
