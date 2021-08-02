import { Injectable } from '@nestjs/common';

import { DataBase } from '../db/index';
import { BadWordParser } from '../bad-words-parser/bad-words-parser'

@Injectable()
export class ChatService {

  public async findRequestForComment(commnets): Promise<any[]> {
    const commentsWithRequest = [];

    for (const commnet of commnets) {
      const request = await this.loadChildComments(commnet);
      const requestWithRequest = await this.findRequestForComment(request)

      commentsWithRequest.push({ ...commnet, request: requestWithRequest });
    }

    return commentsWithRequest;
  }

  public checkingTextForBadWords(comment: string): string[] {
    return BadWordParser.checkMessage(comment);
  }

  public addComment(comment: { text: string, currentUserId: number, sockId: number, parentId: number | null }): Promise<boolean> {
    return DataBase.client
      .query(`INSERT INTO comments (text, userId, date, parentId, sockId) VALUES ($1, $2, $3, $4, $5);`,
        [comment.text, comment.currentUserId, new Date(), comment.parentId, comment.sockId])
      .then(() => true);
  }

  public loadMainComments(params: { offset: number; limit: number, sockId: number }): Promise<any[]> {
    return DataBase.client
      .query(`SELECT comments.userid, comments.text, comments.date, comments.id, comments.sockid, users.name
              FROM comments
              INNER JOIN users ON users.id = comments.userid
              WHERE comments.parentid IS NULL AND comments.sockid = $3
              LIMIT $1 OFFSET $2;`, [params.limit, params.offset, params.sockId])
      .then((result) => result.rows);
  }

  public loadChildComments(params: { id: number, sockid: number }): Promise<any[]> {
    return DataBase.client
      .query(`SELECT comments.userid, comments.text, comments.date, comments.id, comments.parentid, users.name, comments.sockid
              FROM comments
              INNER JOIN users ON users.id = comments.userid
              WHERE comments.parentid = $1
              AND comments.sockid = $2;`, [params.id, params.sockid])
      .then((result) => result.rows);
  }
}
