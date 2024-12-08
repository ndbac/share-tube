import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from 'src/modules/common/jsonwebtoken/jwt.service';
import { UserRepository } from 'src/modules/users/user.repository';
import { getBearerTokenFromRequest } from 'src/shared/helpers';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = getBearerTokenFromRequest(req);
    if (!bearerToken) {
      throw new ForbiddenException('Unauthorized access');
    }
    const tokenData = this.jwtService.decodeToken(bearerToken) as JwtPayload;
    if (tokenData?.data) {
      const account = await this.userRepository.findOneOrFail({
        where: { id: tokenData.data.userId },
      });
      req['user'] = {
        userId: account.id,
      };
    }

    next();
  }
}
