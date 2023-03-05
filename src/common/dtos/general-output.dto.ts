import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeneralMutationOutput {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Boolean)
  ok: boolean;
}
