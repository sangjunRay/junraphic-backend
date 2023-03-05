import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { GeneralEntity } from '../../common/entities/general.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

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

  @BeforeInsert()
  // `cid` 를 hash 후 저장
  async hashingCid(): Promise<void> {
    try {
      this.cid = await bcrypt.hash(this.cid, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async checkHashedCid(plainCid: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainCid, this.cid);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
