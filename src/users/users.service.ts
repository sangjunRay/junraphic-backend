import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.dto';
import { GeneralMutationOutput } from '../common/dtos/general-output.dto';

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
  }: CreateUserInput): Promise<string | undefined> {
    try {
      const exist = await this.users.findOneBy({ cid });
      if (exist) {
        return '이미 존재하는 아이디입니다.';
      }

      //TODO : hashing cid
      const hashedCid = cid + 'hashing';

      await this.users.save(
        this.users.create({ email, role, cid: hashedCid, name }),
      );
      return;
    } catch (e) {
      return e;
    }
  }
}
