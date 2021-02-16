import { Injectable } from '@nestjs/common';
import { QueryResult } from 'pg';
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
    return new Promise((responce, reject) => {
      DataBase.client.query(`SELECT id, name, roles FROM USERS WHERE id = ${id} LIMIT 1;`, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        const result = res.rows[0];
        result.roles = DataBase.parseArray(result.roles);

        responce(res.rows[0]);
      });
    });
  }

  public getUserInfoByHash(hash: string): Promise<UsersDto> {
    return new Promise((responce, reject) => {
      DataBase.client.query(`SELECT id, name, roles FROM USERS WHERE hash = '${hash}' LIMIT 1;`, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        const result = res.rows[0];

        if (result) {
          result.roles = DataBase.parseArray(result.roles);
        }

        responce(result);
      });
    });
  }

  public saveUser(name: string, hash: string): Promise<UsersDto> {
    return new Promise((responce, reject) => {
      DataBase.client.query(`INSERT INTO USERS (name, hash, roles) VALUES ('${name}', '${hash}', '{"client"}');`, (err, res) => {
        if (err) reject(err);

        this.getUserInfoByHash(hash).then(responce);
      });
    });
  }

  public checkToken(hash: string): Promise<QueryResult<any>> {
    return DataBase.client.query(`SELECT id FROM USERS WHERE hash = '${hash}' LIMIT 1;`);
  }
}
