import { Query, Resolver } from '@nestjs/graphql';
import { UsersEntity } from './entities/users.entity';

@Resolver(() => UsersEntity)
export class UsersResolver {
  @Query(() => UsersEntity)
  isAdmin() {
    return true;
  }
}
