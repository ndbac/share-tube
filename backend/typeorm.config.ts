import { config as envConfig } from 'dotenv';
envConfig();
import { UserRecord } from 'src/modules/users/user.entity';
import { DataSource } from 'typeorm';
import config from 'config';

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('db.postgres.host'),
  port: config.get<number>('db.postgres.port'),
  database: config.get<string>('db.postgres.database'),
  username: config.get<string>('db.postgres.username'),
  password: config.get<string>('db.postgres.password'),
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  entities: [UserRecord],
});
