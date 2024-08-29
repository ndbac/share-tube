import { Injectable } from '@nestjs/common';
import { CreateUserInputDto, UserLoginInputDto } from '../dto/users.dto';
import _ from 'lodash';
import { UserRecord } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRepository: Repository<UserRecord>,
  ) {}

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
