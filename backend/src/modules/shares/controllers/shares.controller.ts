import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EndpointConfig } from 'src/decorators/endpoint-config.decorator';
import { EShareOperation, SHARE_ENDPOINT_CONFIG } from './endpoint-config';
import { ShareService } from '../providers/shares.service';
import { User } from 'src/decorators/user.decorator';
import { ShareInputDto } from '../dto/shares.dto';

@Controller('share')
@ApiTags('user.share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('share')
  @ApiBearerAuth()
  @EndpointConfig(SHARE_ENDPOINT_CONFIG[EShareOperation.NEW_SHARE])
  login(@User('userId') userId: string, @Body() data: ShareInputDto) {
    return this.shareService.newShare(userId, data);
  }
}
