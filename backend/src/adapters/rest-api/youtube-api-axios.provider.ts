import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import config from 'config';
import { BadRequestException } from '@nestjs/common';

export const YOUTUBE_API_AXIOS = 'youtube-api-axios';

export const logResponse = (response: AxiosResponse) => {
  console.log(JSON.stringify(response), `Youtube API call result`);
  return response;
};

export const logError = (error: AxiosError) => {
  if (isAxiosError(error)) {
    console.error(JSON.stringify(error), `Youtube API call error`);
    throw new BadRequestException(`Youtube API call error`);
  } else {
    throw error;
  }
};

export const youtubeApiAxiosProvider = {
  provide: YOUTUBE_API_AXIOS,
  useFactory: () => {
    const instance = axios.create({
      baseURL: config.get<string>('youtube.baseUrl'),
    });

    instance.interceptors.response.use(logResponse, logError);

    return instance;
  },
};
