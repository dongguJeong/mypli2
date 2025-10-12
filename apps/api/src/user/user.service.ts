import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  findOneByEmail(email: string) {
    return this.users.findOneBy({ email });
  }

  async remove(email: string) {
    await this.users.delete(email);
    return { message: '삭제 완료' };
  }
}
