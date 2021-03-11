import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class Users2Service {
  public users = [
    {
      userId: 1,
      username: 'a',
      password: 'a',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log(this.users)
    return this.users.find((user) => user.username === username);
  }
}
