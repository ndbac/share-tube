import { Module } from '@nestjs/common';
import { youtubeApiAxiosProvider } from './youtube-api-axios.provider';

@Module({
  providers: [youtubeApiAxiosProvider],
  exports: [youtubeApiAxiosProvider],
})
export class RestApiModule {}
