import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';

/**
 * Handle Database connection.
 */
export class DBRootModule {
  static forPostgres() {
    return TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...config.get<TypeOrmModuleOptions>('db.postgres'),
      }),
    });
  }
}
