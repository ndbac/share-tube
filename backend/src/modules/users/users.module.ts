import { Module } from '@nestjs/common';
import { UserService } from './providers/users.service';
import { UserController } from './controllers/users.controller';
import { UserRecord } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRecord])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
