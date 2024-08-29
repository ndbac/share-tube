import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithUserCtx } from 'src/shared/types';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequestWithUserCtx>();
    switch (data) {
      case 'userId':
        return request.user.userId;
      default:
        return request.user;
    }
  },
);
