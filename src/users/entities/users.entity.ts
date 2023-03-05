import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GeneralEntity } from '../../common/entities/general.entity';

type UserRoles = 'author' | 'customer';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class UsersEntity extends GeneralEntity {
  @PrimaryColumn()
  @Field(() => String)
  @IsString()
  cid: string;

  @Column()
  @Field(() => String)
  @IsString()
  role: UserRoles;

  @Column()
  @Field(() => String)
  @IsString()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  name: string;
}
