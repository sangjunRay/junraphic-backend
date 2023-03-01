import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class GraphicEntity {
  @Field(() => Number)
  @IsNumber()
  like: number;

  @Field(() => Number)
  @IsNumber()
  view: number;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Boolean)
  @IsBoolean()
  soldOut: boolean;

  @Field(() => [])
  @IsArray()
  images: string[];
}
