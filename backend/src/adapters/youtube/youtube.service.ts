import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import config from 'config';
import { YOUTUBE_API_AXIOS } from '../rest-api/youtube-api-axios.provider';
import { IYoutubeVideoMetadata } from './types';

@Injectable()
export class YoutubeService {
  private apiKey = config.get<string>('youtube.apiKey');

  constructor(
    @Inject(YOUTUBE_API_AXIOS)
    private readonly axios: AxiosInstance,
  ) {}

  async getVideoMetadata(videoId: string) {
    const { data } = await this.axios.get<IYoutubeVideoMetadata>(
      `videos?part=snippet&id=${videoId}&key=${this.apiKey}`,
    );
    return data;
  }
}
