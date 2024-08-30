import { HttpStatus } from '@nestjs/common';
import { IEndpointConfiguration } from 'src/shared/types';
import { ShareInputDto } from '../dto/shares.dto';

export enum EShareOperation {
  NEW_SHARE = 'userShareYoutubeVideo',
}

export const SHARE_ENDPOINT_CONFIG: Record<
  EShareOperation,
  IEndpointConfiguration
> = {
  [EShareOperation.NEW_SHARE]: {
    operationId: EShareOperation.NEW_SHARE,
    summary: 'User share a new Youtube video',
    body: {
      type: ShareInputDto,
    },
    responses: [
      {
        status: HttpStatus.OK,
      },
    ],
  },
};
