import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, context: GqlExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    return gqlContext['user'];
  },
);
