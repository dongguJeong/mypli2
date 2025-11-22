// auth/session.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import type { Session as ExpressSession } from 'express-session';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request & ExpressSession>();

    const userId = req.session.userId;

    if (!userId) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    (req as ExpressSession).userId = userId;
    return true;
  }
}
