export type UserCreateDto = {
  name: string;
  password: string;
};

export enum Roles {
  admin = 'admin',
  client = 'client',
}

export class UserDto {
  public name: string = '';
  public id: number | null = null;
  public roles: Roles[] = [];
}
