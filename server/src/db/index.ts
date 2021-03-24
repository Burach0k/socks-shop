import { Client } from 'pg';

import { env } from '../environments/environments';

export class DataBase {
  public static client = new Client({
    connectionString: env.dataBaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  public static parseArray(stringArray: string): any[] {
    return stringArray.slice(1, stringArray.length - 1).split(',');
  }
}
