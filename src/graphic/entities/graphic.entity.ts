import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { GeneralEntity } from '../../common/entities/general.entity';

@ObjectType()
@Entity()
export class GraphicEntity extends GeneralEntity {
  @Column()
  @Field(() => Number)
  @IsNumber()
  like: number;

  @Column()
  @Field(() => Number)
  @IsNumber()
  view: number;

  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @Column()
  @Field(() => String)
  @IsString()
  description: string;

  @Column()
  @Field(() => Boolean)
  @IsBoolean()
  soldOut: boolean;

  @Column({ array: true })
  @Field(() => String)
  @IsString()
  images: string;

  @Column({ array: true })
  @Field(() => Number)
  @IsString()
  categories: number;
}
