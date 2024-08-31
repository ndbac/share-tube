import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import config from 'config';
import { BadRequestException } from '@nestjs/common';
import _ from 'lodash';

export const YOUTUBE_API_AXIOS = 'youtube-api-axios';

export const logResponse = (response: AxiosResponse) => {
  console.log(
    JSON.stringify(_.omit(response, ['request'])),
    `Youtube API call result`,
  );
  return response;
};

export const logError = (error: AxiosError) => {
  if (isAxiosError(error)) {
    console.error(
      JSON.stringify(_.omit(error, ['request'])),
      `Youtube API call error`,
    );
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
