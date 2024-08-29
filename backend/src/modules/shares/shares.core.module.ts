import { ShareRepository } from './shares.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShareRepository])],
  exports: [TypeOrmModule],
})
export class ShareCoreModule {}
