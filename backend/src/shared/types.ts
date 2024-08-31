import {
  ApiParamOptions,
  ApiBodyOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export interface IEndpointConfiguration {
  operationId: string;
  description?: string;
  deprecated?: boolean;
  summary?: string;
  params?: ApiParamOptions[];
  body?: ApiBodyOptions;
  query?: ApiQueryOptions[];
  contentTypes?: string[];
  responses?: ApiResponseOptions[];
}

export interface IIamUser {
  userId: string;
  email: string;
  name: string;
}

export interface IRequestWithUserCtx extends Request {
  user: IIamUser;
}

export interface IPagination {
  page: number;
  pageSize: number;
  offset: number;
}

export interface IPaginationOptions {
  maxLimit?: number;
}

export interface IPaginationHeader {
  'x-pagination-page': number;
  'x-pagination-page-size': number;
  'x-pagination-total': number;
}

export interface IPaginationResponse<T> {
  items: T[];
  headers: IPaginationHeader;
}
