import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserInputDto, UserLoginInputDto } from '../dto/users.dto';
import _ from 'lodash';
import { UserRecord } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/modules/common/bcrypt/bcrypt.service';
import { JwtService } from 'src/modules/common/jsonwebtoken/jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { generateRandomString } from 'src/shared/helpers';

const REFRESH_TOKEN_LENGTH = 32;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRepository: Repository<UserRecord>,
    private readonly encryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserInputDto) {
    await this.isAbleToRegisterAccount(data);

    const userId = uuidv4();
    const hashedPassword = await this.encryptService.hash(data.password);
    const token = this.jwtService.signToken({ email: data.email, userId });
    const refreshToken = generateRandomString(REFRESH_TOKEN_LENGTH);
    const hashedRefreshToken = await this.encryptService.hash(refreshToken);

    const user = await this.userRepository.save({
      id: userId,
      email: data.email,
      password: hashedPassword,
      name: data.name,
      refreshToken: hashedRefreshToken,
    });
    return {
      ..._.omit(user, ['password', 'refreshToken']),
      credential: { token, refreshToken },
    };
  }

  async login(data: UserLoginInputDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: data.email },
    });
    const isMatchedPassword = await this.encryptService.compare(
      user.password,
      data.password,
    );
    if (isMatchedPassword) {
      throw new ForbiddenException('Invalid email or password');
    }

    const token = this.jwtService.signToken({
      email: data.email,
      userId: user.id,
    });
    const refreshToken = generateRandomString(REFRESH_TOKEN_LENGTH);
    const hashedRefreshToken = await this.encryptService.hash(refreshToken);
    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return {
      ..._.omit(user, ['password', 'refreshToken']),
      credential: { token, refreshToken },
    };
  }

  async getProfile() {
    return null;
  }

  private async isAbleToRegisterAccount(data: CreateUserInputDto) {
    const existed = await this.userRepository.exists({
      where: { email: data.email },
    });
    if (existed) {
      throw new ForbiddenException(
        `User with email: ${data.email} already exists`,
      );
    }
  }
}
