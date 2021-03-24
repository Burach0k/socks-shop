import { Injectable } from '@nestjs/common';

import { SockInfo, SockViewInfo } from '../dto/sock-view-info.dto';
import { DataBase } from '../db/index';

@Injectable()
export class SockViewService {

  public getSockById(id: number): Promise<SockInfo> {
    return DataBase.client
      .query(`SELECT socks.likes, socks.id, users.subscribes, socks.name, socks.daefile, socks.userId, users.name as userName 
              FROM socks
              INNER JOIN users ON socks.userid = users.id
              WHERE socks.id = $1 LIMIT 1;`, [id])
      .then((res) => res.rows[0]);
  }

  public getSocksByOffset(body: { offset: number, limit: number, orderBy?: string }): Promise<any> {
    return DataBase.client
      .query(`SELECT socks.name, socks.id, users.name as userName, cardinality(socks.likes) AS likes
        FROM socks
        INNER JOIN users ON users.id = socks.userid
        ORDER BY ${body.orderBy || 'socks.name'} LIMIT $1 OFFSET $2;`, [body.limit, body.offset])
      .then((res) => res.rows);
  }

  public getSubscribesByOffset(body: { offset: number, limit: number, orderBy?: string, currentUserId: number }): Promise<any> {
    return DataBase.client
      .query(`SELECT socks.name, users.name as userName, cardinality(socks.likes) as likes, socks.id 
        FROM socks
        INNER JOIN users ON users.id = $3
        WHERE array_position(users.subscribes, socks.userid) > 0
        ORDER BY ${body.orderBy || 'name'}
        LIMIT $1 OFFSET $2;`, [body.limit, body.offset, body.currentUserId])
      .then((res) => res.rows);
  }

  public getImageById(id: number): Promise<JSON> {
    return DataBase.client
      .query(`SELECT encode(image, 'escape') FROM SOCKS WHERE id = $1 LIMIT 1;`, [id])
      .then(this.toByte);
  }

  public addLike(id: number, userId: number): Promise<{ likes: number[] }> {
    return DataBase.client
      .query(`UPDATE socks SET likes = array_append(likes, $2) WHERE id = $1 RETURNING likes;`, [id, userId])
      .then((res) => res.rows[0]);
  }

  public unlike(id: number, userId: number): Promise<{ likes: number[] }> {
    return DataBase.client
      .query(`UPDATE socks SET likes = array_remove(likes, $2) WHERE id = $1 RETURNING likes;`, [id, userId])
      .then((res) => res.rows[0]);
    }

  public toByte(res): JSON {
    return JSON.parse(res.rows[0].encode).buffer.data;
  }

  public addLikesAndSubscrubesParams(sockInfo, currentUserId): SockViewInfo {
    const { likes, subscribes, ...correctInfo } = sockInfo;
    const isUserLike = likes.findIndex(userId => userId === currentUserId) !== -1;
    const isUserSubscribe = subscribes.findIndex(userId => userId === sockInfo.userid) !== -1;

    return { ...correctInfo, isUserLike, isUserSubscribe, likes: likes.length };
  }
}
