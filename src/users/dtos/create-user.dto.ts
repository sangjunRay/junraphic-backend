import { InputType, ObjectType } from '@nestjs/graphql';

import { UsersEntity } from '../entities/users.entity';
import { GeneralMutationOutput } from '../../common/dtos/general-output.dto';

@InputType()
export class CreateUserInput extends UsersEntity {}

@ObjectType()
export class CreateUserOutput extends GeneralMutationOutput {}
