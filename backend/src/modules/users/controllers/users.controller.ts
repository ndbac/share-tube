import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EndpointConfig } from 'src/decorators/endpoint-config.decorator';
import { EUserOperation, USER_ENDPOINT_CONFIG } from './endpoint-config';
import { CreateUserInputDto, UserLoginInputDto } from '../dto/users.dto';
import { UserService } from '../providers/users.service';

@Controller('user')
@ApiTags('user.auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @EndpointConfig(USER_ENDPOINT_CONFIG[EUserOperation.LOGIN])
  login(@Body() data: UserLoginInputDto) {
    return this.userService.login(data);
  }

  @Post('register')
  @EndpointConfig(USER_ENDPOINT_CONFIG[EUserOperation.REGISTER])
  register(@Body() data: CreateUserInputDto) {
    return this.userService.register(data);
  }
}
