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
