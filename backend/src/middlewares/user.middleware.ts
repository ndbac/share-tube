import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from 'src/modules/common/jsonwebtoken/jwt.service';
import { UserRecord } from 'src/modules/users/user.entity';
import { getBearerTokenFromRequest } from 'src/shared/helpers';
import { Repository } from 'typeorm';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserRecord)
    private readonly userRepository: Repository<UserRecord>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = getBearerTokenFromRequest(req);
    if (!bearerToken) {
      throw new ForbiddenException('Unauthorized access');
    }
    const tokenData = this.jwtService.verifyToken(bearerToken) as JwtPayload;
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
