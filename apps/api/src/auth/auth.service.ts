import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async signup(email: string, password: string) {
    const exists = await this.users.findOne({ where: { email } });
    if (exists) throw new Error('이미 가입된 이메일입니다.');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.users.create({ email, password: hashed });
    await this.users.save(user);
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('존재하지 않는 사용자입니다.');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    return user;
  }

  async getUserById(id: number) {
    return this.users.findOne({ where: { id } });
  }
}
