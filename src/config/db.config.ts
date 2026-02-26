


import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    url: process.env.POSTGRES_URL,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: {rejectUnauthorized: false},
    entities: [path.resolve(__dirname, '..')  + `/../**/*.entity.js`],
  
    synchronize: true,
  }),
);


