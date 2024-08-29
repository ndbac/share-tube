import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { DBRootModule } from 'src/adapters/db/db-root.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [DBRootModule.forPostgres(), HealthModule, UserModule],
})
export class AppModule {}
