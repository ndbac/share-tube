import { config as envConfig } from 'dotenv';
envConfig();

import config from 'config';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: config.get<string>('db.postgres.host'),
  port: config.get<number>('db.postgres.port'),
  database: config.get<string>('db.postgres.database'),
  username: config.get<string>('db.postgres.username'),
  password: config.get<string>('db.postgres.password'),
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  entities: [`**/*.entity{.ts,.js}`],
};

export default new DataSource(options);
