import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { GraphicModule } from './graphic/graphic.module';
import { ThemeModule } from './theme/theme.module';
import { BannerModule } from './banner/banner.module';
import { JwtModule } from './jwt/jwt.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphicEntity } from './graphic/entities/graphic.entity';
import { CategoriesModule } from './categories/categories.module';
import { UsersEntity } from './users/entities/users.entity';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' && '.env.development',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      entities: [GraphicEntity, UsersEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      context: ({ req }) => ({
        user: req['user'],
      }),
    }),
    JwtModule.forRoot({
      privateKey: process.env.TOKEN_SECRET_KEY,
    }),
    UsersModule,
    GraphicModule,
    ThemeModule,
    BannerModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
