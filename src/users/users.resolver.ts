import { Query, Resolver } from '@nestjs/graphql';
import { Users } from './entities/users.entity';

@Resolver(() => Users)
export class UsersResolver {
  @Query(() => Users)
  isAdmin() {
    return true;
  }
}
