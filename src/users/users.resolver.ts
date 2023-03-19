import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { GeneralMutationOutput } from '../common/dtos/general-output.dto';
import { CreateUserInput } from './dtos/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';
import { LoginInput, LoginOutput } from './dtos/login.dto';

@Resolver(() => UsersEntity)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => GeneralMutationOutput)
  async createUser(@Args('input') createUserInput: CreateUserInput) {
    try {
      const [ok, error] = await this.userService.createUser(createUserInput);
      if (error) {
        return { ok, error };
      }
      return { ok };
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Mutation(() => LoginOutput)
  async login(@Args('input') loginInput: LoginInput) {
    try {
      const { ok, error, token } = await this.userService.login(loginInput);
      return {
        ok,
        error,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: '로그인 할 수 없습니다.',
      };
    }
  }

  @Query(() => UsersEntity)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: UsersEntity) {
    if (!authUser) {
      return;
    } else {
      return authUser;
    }
  }
}
