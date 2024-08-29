import { config as envConfig } from 'dotenv';
envConfig();
import { UserRecord } from 'src/modules/users/user.entity';
import { DataSource } from 'typeorm';
import config from 'config';
import { ShareRecord } from 'src/modules/shares/shares.entity';

export default new DataSource({
  type: 'postgres',
  host: config.get<string>('db.migration.host'),
  port: config.get<number>('db.migration.port'),
  database: config.get<string>('db.migration.database'),
  username: config.get<string>('db.migration.username'),
  password: config.get<string>('db.migration.password'),
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  entities: [UserRecord, ShareRecord],
});
