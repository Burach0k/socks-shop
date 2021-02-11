import { Client } from 'pg';

export class DataBase {
  public static client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/socks_shop',
    ssl: {
      rejectUnauthorized: false,
    },
  });

  public static parseArray(stringArray: string): any[] {
    return stringArray.slice(1, stringArray.length - 1).split(',');
  }
}
