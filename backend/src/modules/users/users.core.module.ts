import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRecord } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserCoreModule {}
