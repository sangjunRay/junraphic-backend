import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { UsersEntity } from '../entities/users.entity';
import { GeneralMutationOutput } from '../../common/dtos/general-output.dto';

@InputType()
export class LoginInput extends PickType(UsersEntity, ['cid', 'email']) {}

@ObjectType()
export class LoginOutput extends GeneralMutationOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
