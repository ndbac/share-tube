import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { DBRootModule } from 'src/adapters/db/db-root.module';

@Module({
  imports: [DBRootModule.forPostgres(), HealthModule],
})
export class AppModule {}
