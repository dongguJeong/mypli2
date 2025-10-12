import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { signupDto } from './dto/signup.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async login(signupDto: signupDto) {
    const user = await this.users.findOneBy({ email: signupDto.email });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const isValid = await bcrypt.compare(signupDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      message: '로그인 성공',
      user: userWithoutPassword,
    };
  }

  logout() {}

  async signup(signupDto: signupDto) {
    const exists = await this.users.findOneBy({ email: signupDto.email });
    if (exists) throw new ConflictException('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const newUser = this.users.create({
      email: signupDto.email,
      password: hashedPassword,
    });

    const savedUser = await this.users.save(newUser);

    return {
      message: '회원가입 완료',
      email: savedUser.email,
    };
  }
}
