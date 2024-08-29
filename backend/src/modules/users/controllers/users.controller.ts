import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EndpointConfig } from 'src/decorators/endpoint-config.decorator';
import { EUserOperation, USER_ENDPOINT_CONFIG } from './endpoint-config';
import {
  CreateUserInputDto,
  RefreshTokenInputDto,
  UserLoginInputDto,
} from '../dto/users.dto';
import { UserService } from '../providers/users.service';
import { User } from 'src/decorators/user.decorator';

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

  @Get('profile')
  @ApiBearerAuth()
  @EndpointConfig(USER_ENDPOINT_CONFIG[EUserOperation.GET_PROFILE])
  getProfile(@User('userId') userId: string) {
    return this.userService.getProfile(userId);
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @EndpointConfig(USER_ENDPOINT_CONFIG[EUserOperation.REFRESH_TOKEN])
  refreshToken(
    @User('userId') userId: string,
    @Body() data: RefreshTokenInputDto,
  ) {
    return this.userService.refreshAccountToken(userId, data.refreshToken);
  }
}
