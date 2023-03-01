import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [UsersResolver],
})
export class UsersModule {}
