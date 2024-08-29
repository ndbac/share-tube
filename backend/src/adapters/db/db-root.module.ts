import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';
import { ShareRecord } from 'src/modules/shares/shares.entity';
import { UserRecord } from 'src/modules/users/user.entity';

/**
 * Handle Database connection.
 */
export class DBRootModule {
  static forPostgres() {
    return TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...config.get<TypeOrmModuleOptions>('db.postgres'),
        entities: [UserRecord, ShareRecord],
      }),
    });
  }
}
