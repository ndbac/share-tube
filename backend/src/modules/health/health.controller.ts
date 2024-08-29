import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  @Get('ready')
  @ApiOperation({
    operationId: 'probeServiceReady',
  })
  checkHealth() {
    return { msg: 'Hello world' };
  }
}
