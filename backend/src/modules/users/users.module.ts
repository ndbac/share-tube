import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './providers/users.service';
import { UserController } from './controllers/users.controller';
import { CommonModule } from '../common/common.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { RefreshTokenMiddleware } from 'src/middlewares/fresh-token.middleware';
import { UserCoreModule } from './users.core.module';

@Module({
  imports: [UserCoreModule, CommonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: `/user/profile`,
      method: RequestMethod.GET,
    });

    consumer.apply(RefreshTokenMiddleware).forRoutes({
      path: `/user/refresh-token`,
      method: RequestMethod.POST,
    });
  }
}
