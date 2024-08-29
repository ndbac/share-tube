import { Module } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { UserController } from './controllers/users.controller';
import { UserRecord } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
