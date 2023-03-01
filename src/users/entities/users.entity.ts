import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class UsersEntity {
  @Field(() => Boolean)
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  cid: string;
}
