import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
  ) {}

  async createUser({
    cid,
    email,
    role,
    name,
  }: CreateUserInput): Promise<[boolean, string?]> {
    try {
      const user = await this.users.findOneBy({ email });
      if (user) {
        const cidIsCorrect = await user.checkHashedCid(cid);
        if (cidIsCorrect) {
          return [false, '이미 존재하는 이메일입니다.'];
        }
      } else {
        await this.users.save(this.users.create({ email, role, cid, name }));
        return [true];
      }
    } catch (e) {
      return [false, e];
    }
  }
}
