import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@ObjectType()
@Entity()
export class GeneralEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => Date)
  @IsDate()
  @CreateDateColumn()
  create_at: Date;

  @Field(() => Date)
  @IsDate()
  @UpdateDateColumn()
  update_at: Date;
}
