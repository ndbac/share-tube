import { HttpStatus } from '@nestjs/common';
import { IEndpointConfiguration } from 'src/shared/types';
import {
  CreateUserInputDto,
  RefreshTokenInputDto,
  UserCredentialResponseDto,
  UserLoginInputDto,
  UserProfileResponseDto,
  UserResponseDto,
} from '../dto/users.dto';

export enum EUserOperation {
  LOGIN = 'userLogin',
  REGISTER = 'userRegister',
  GET_PROFILE = 'userProfile',
  REFRESH_TOKEN = 'userRefreshToken',
}

export const USER_ENDPOINT_CONFIG: Record<
  EUserOperation,
  IEndpointConfiguration
> = {
  [EUserOperation.LOGIN]: {
    operationId: EUserOperation.LOGIN,
    summary: 'User login account',
    body: {
      type: UserLoginInputDto,
    },
    responses: [
      {
        type: UserResponseDto,
        status: HttpStatus.OK,
      },
    ],
  },
  [EUserOperation.REGISTER]: {
    operationId: EUserOperation.REGISTER,
    summary: 'User register account',
    body: {
      type: CreateUserInputDto,
    },
    responses: [
      {
        type: UserResponseDto,
        status: HttpStatus.CREATED,
      },
    ],
  },
  [EUserOperation.GET_PROFILE]: {
    operationId: EUserOperation.GET_PROFILE,
    summary: 'User get profile',
    responses: [
      {
        type: UserProfileResponseDto,
        status: HttpStatus.OK,
      },
    ],
  },
  [EUserOperation.REFRESH_TOKEN]: {
    operationId: EUserOperation.REFRESH_TOKEN,
    summary: 'User refresh token',
    body: {
      type: RefreshTokenInputDto,
    },
    responses: [
      {
        type: UserCredentialResponseDto,
        status: HttpStatus.OK,
      },
    ],
  },
};
