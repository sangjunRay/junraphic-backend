import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { GeneralMutationOutput } from '../common/dtos/general-output.dto';
import { CreateUserInput } from './dtos/create-user.dto';

@Resolver(() => UsersEntity)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}
  @Query(() => UsersEntity)
  getRole() {
    return true;
  }

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
}
