import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GraphicModule } from './graphic/graphic.module';
import { ThemeModule } from './theme/theme.module';
import { BannerModule } from './banner/banner.module';
import { JwtModule } from './jwt/jwt.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from '../orm-config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' && '.dev.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot(OrmConfig),
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
