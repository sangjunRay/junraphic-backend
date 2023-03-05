import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UsersEntity } from '../entities/users.entity';
import { GeneralMutationOutput } from '../../common/dtos/general-output.dto';

@InputType()
export class CreateUserInput extends PickType(UsersEntity, [
  'role',
  'cid',
  'name',
  'email',
]) {}

@ObjectType()
export class CreateUserOutput extends GeneralMutationOutput {}
