import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/create-user.dto';
import { JwtService } from '../jwt/jwt.service';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
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

  async login({ email, cid }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'cid'],
      });
      if (!user) {
        return { ok: false, error: '이메일이 존재하지 않습니다.' };
      }
      const cidIsCorrect = await user.checkHashedCid(cid);
      if (!cidIsCorrect) {
        return { ok: false, error: '옳지 않은 접근입니다.' };
      }
      const token = this.jwtService.sign({
        id: (await user).id,
        nickname: (await user).name,
      });
      return { ok: true, token: token };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: number): Promise<UsersEntity> {
    return this.users.findOne({ where: { id } });
  }
}
