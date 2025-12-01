import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import type { Session as ExpressSession } from 'express-session';

import type { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SessionGuard } from './auth.guard';
import { CurrentUser } from './auth.current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    const user = await this.authService.signup(dto);
    return {
      message: '회원가입 성공',
      user: { id: user.id, email: user.email },
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Session() session: ExpressSession) {
    const user = await this.authService.validateUser(dto);
    session.userId = user.id;
    return { message: '로그인 성공', user };
  }

  @Get('status')
  async status(@CurrentUser() userId: number) {
    if (!userId) return { loggedIn: false };
    const user = await this.authService.getUserById(userId);
    if (!user) return { loggedIn: false };
    return {
      loggedIn: true,
      user: {
        username: user.username,
        isAdmin: user.role === 'admin',
      },
    };
  }

  @Get('logout')
  @UseGuards(SessionGuard)
  logout(@Session() session: ExpressSession, @Res() res: Response) {
    session?.destroy?.((err: unknown) => {
      if (err instanceof Error) console.error(err.message);
    });
    res.clearCookie('connect.sid');
    return res.json({ message: '로그아웃 완료' });
  }
}
