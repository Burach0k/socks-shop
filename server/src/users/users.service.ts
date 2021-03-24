import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

import { DataBase } from '../db/index';
import { createUserDto, UsersDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  public generateHash(createUserDto: createUserDto): string {
    const hash = createHash('sha256');
    hash.update(createUserDto.name + createUserDto.password);

    return hash.digest('hex');
  }

  public getUserInfo(id: number): Promise<UsersDto> {
    return DataBase.client
      .query(`SELECT * FROM USERS WHERE id = ${id} LIMIT 1;`, [id])
      .then(this.addRoles.bind(this));
  }

  public getUserInfoByHash(hash: string): Promise<UsersDto> {
    return DataBase.client
      .query(`SELECT id, name, roles FROM USERS WHERE hash = '${hash}' LIMIT 1;`, [hash])
      .then(this.addRoles.bind(this));
  }

  public saveUser(name: string, password: string): Promise<number> {
    return DataBase.client
      .query(`INSERT INTO USERS (name, password, roles) VALUES ($1, $2, '{"client"}') RETURNING id;`, [name, password])
      .then((req) => req.rows[0].id);
  }

  public checkUser({ name, password }: { name: string; password: string }): Promise<any> {
    return DataBase.client
      .query(`SELECT * FROM USERS WHERE name = $1 AND password = $2 LIMIT 1;`, [name, password])
      .then((res) => res.rows[0]);
  }

  public subscribeToAuthor(currentUserId, userId): Promise<any> {
    return DataBase.client
      .query(`UPDATE users SET subscribes = array_append(subscribes, $2) WHERE id = $1;`, [currentUserId, userId])
      .then((res) => res.rows[0]);
  }

  public unsubscribeToAuthor(currentUserId, userId): Promise<any> {
    return DataBase.client
      .query(`UPDATE users SET subscribes = array_remove(subscribes, $2) WHERE id = $1;`, [currentUserId, userId])
      .then((res) => res.rows[0]);
  }

  private addRoles(request): any {
    const result = request.rows[0];

    if (result) {
      result.roles = DataBase.parseArray(result.roles);
    }

    return result;
  }
}
