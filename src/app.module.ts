import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GraphicModule } from './graphic/graphic.module';
import { ThemeModule } from './theme/theme.module';
import { BannerModule } from './banner/banner.module';
import { JwtModule } from './jwt/jwt.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UsersModule,
    GraphicModule,
    ThemeModule,
    BannerModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
