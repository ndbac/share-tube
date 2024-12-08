import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareRecord } from './shares.entity';
import { ShareRepository } from './shares.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShareRecord])],
  providers: [ShareRepository],
  exports: [ShareRepository],
})
export class ShareCoreModule {}
