import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { ShareController } from './controllers/shares.controller';
import { ShareService } from './providers/shares.service';
import { YoutubeModule } from 'src/adapters/youtube/youtube.module';
import { WebsocketModule } from 'src/adapters/websocket/websocket.module';
import { NodeMailerModule } from 'src/adapters/node-mailer/node-mailer.module';
import { ShareCoreModule } from './shares.core.module';
import { UserCoreModule } from '../users/users.core.module';

@Module({
  imports: [
    ShareCoreModule,
    UserCoreModule,
    CommonModule,
    NodeMailerModule,
    YoutubeModule,
    WebsocketModule,
  ],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({
      path: `/share`,
      method: RequestMethod.POST,
    });
  }
}
