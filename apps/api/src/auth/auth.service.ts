import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Users } from 'src/users/entity/users.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private users: Repository<Users>) {}

  async signup(dto: SignupDto) {
    const existEmail = await this.users.findOne({
      where: { email: dto.email },
    });
    if (existEmail) throw new Error('이미 가입된 이메일입니다.');

    const existUsername = await this.users.findOne({
      where: { email: dto.email },
    });
    if (existUsername) throw new Error('이미 사용 중인 이름입니다');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({
      email: dto.email,
      passwordHash: hashed,
      username: dto.username,
    });
    await this.users.save(user);
    return user;
  }

  async validateUser(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('존재하지 않는 사용자입니다.');

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    return { id: user.id, email: user.email };
  }

  async getUserById(id: number) {
    return this.users.findOne({ where: { id } });
  }
}
