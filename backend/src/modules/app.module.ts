import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { DBRootModule } from 'src/adapters/db/db-root.module';
import { UserModule } from './users/users.module';
import { ShareModule } from './shares/shares.module';

@Module({
  imports: [DBRootModule.forPostgres(), HealthModule, UserModule, ShareModule],
})
export class AppModule {}
