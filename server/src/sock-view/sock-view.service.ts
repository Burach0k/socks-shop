import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db';

@Injectable()
export class SockViewService {

  public getSockById(id: number): Promise<any> {
    return DataBase.client
      .query(`SELECT * FROM SOCKS where id = $1 LIMIT 1;`, [id])
      .then((res) => res.rows[0]);
  }

  public getNameAndImageByOffset(body: { offset: number, limit: number }): Promise<any> {
    return DataBase.client
      .query(`SELECT name, id FROM SOCKS ORDER BY name LIMIT $1 OFFSET $2;`, [body.limit, body.offset])
      .then((res) => res.rows);
  }

  public getImageById(id: number): Promise<any> {
    return DataBase.client
      .query(`SELECT encode(image, 'escape') FROM SOCKS WHERE id = $1 LIMIT 1;`, [id])
      .then(this.toByte);
  }

  public toByte(res) {
    return JSON.parse(res.rows[0].encode).buffer.data
  }
}
