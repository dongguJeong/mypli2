// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SessionGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @ApiBody({ type: signupDto })
  async login(@Body() signupDto: signupDto, @Req() req: Request) {
    const { user } = await this.auth.login(signupDto);
    req.session.user = { id: user.id, email: user.email }; // ✅ 정상 작동
    return { message: '로그인 성공', user };
  }

  @Post('signup')
  @ApiBody({ type: signupDto })
  singup(@Body() signupDto: signupDto) {
    return this.auth.signup(signupDto);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.session.destroy(() => {});
    res.clearCookie('connect.sid');
    return { message: '로그아웃 성공' };
  }

  @Get('status')
  status(@Req() req: Request) {
    if (req.session.user) return { loggedIn: true };
    return { loggedIn: false };
  }

  @Get('me')
  @UseGuards(SessionGuard)
  async getProfile(@Req() req: Request) {
    const user = await this.auth.getProfile(req.session.user!.id);
    return user;
  }
}
