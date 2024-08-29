import { Injectable } from '@nestjs/common';
import { CreateUserInputDto, UserLoginInputDto } from '../dto/users.dto';
import { UserRepository } from '../user.repository';
import _ from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: CreateUserInputDto) {
    const user = await this.userRepository.save({
      email: data.email,
      password: data.password,
      name: data.name,
      refreshToken: '',
    });
    return _.omit(user, 'password');
  }

  async login(data: UserLoginInputDto) {
    return data;
  }
}
