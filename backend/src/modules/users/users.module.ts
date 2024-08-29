import { Module } from '@nestjs/common';
import { UserCoreModule } from './user.core.module';
import { UserService } from './providers/users.service';
import { UserController } from './controllers/users.controller';

@Module({
  imports: [UserCoreModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
