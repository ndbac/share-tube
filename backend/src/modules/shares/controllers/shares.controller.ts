import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EndpointConfig } from 'src/decorators/endpoint-config.decorator';
import { EShareOperation, SHARE_ENDPOINT_CONFIG } from './endpoint-config';
import { ShareService } from '../providers/shares.service';
import { User } from 'src/decorators/user.decorator';
import { ShareInputDto } from '../dto/shares.dto';
import {
  Pagination,
  PaginationSwaggerQuery,
} from 'src/decorators/pagination.decorator';
import { PaginationInterceptor } from 'src/interceptors/pagination.interceptor';
import { IIamUser, IPagination } from 'src/shared/types';

@Controller('share')
@ApiTags('user.share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post()
  @ApiBearerAuth()
  @EndpointConfig(SHARE_ENDPOINT_CONFIG[EShareOperation.NEW_SHARE])
  create(@User() user: IIamUser, @Body() data: ShareInputDto) {
    return this.shareService.newShare(user, data);
  }

  @Get('filter')
  @UseInterceptors(PaginationInterceptor)
  @PaginationSwaggerQuery()
  @EndpointConfig(SHARE_ENDPOINT_CONFIG[EShareOperation.FILTER_SHARES])
  filters(@Pagination() pagination: IPagination) {
    return this.shareService.filterShares(pagination);
  }
}
