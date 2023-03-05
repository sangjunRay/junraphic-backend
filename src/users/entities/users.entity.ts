import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { GeneralEntity } from '../../common/entities/general.entity';

type UserRoles = 'author' | 'customer';

@ObjectType()
export class UsersEntity extends GeneralEntity {
  @Field(() => String)
  @IsString()
  role: UserRoles;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  cid: string;
}
