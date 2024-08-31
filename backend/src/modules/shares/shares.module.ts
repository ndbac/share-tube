import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { ShareRecord } from './shares.entity';
import { ShareController } from './controllers/shares.controller';
import { ShareService } from './providers/shares.service';
import { UserRecord } from '../users/user.entity';
import { YoutubeModule } from 'src/adapters/youtube/youtube.module';
import { WebsocketModule } from 'src/adapters/websocket/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShareRecord]),
    TypeOrmModule.forFeature([UserRecord]),
    CommonModule,
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
