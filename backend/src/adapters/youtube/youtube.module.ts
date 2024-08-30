import { Module } from '@nestjs/common';
import { RestApiModule } from '../rest-api/rest-api.module';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [RestApiModule],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}
