import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ray',
  password: '',
  database: 't11e',
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.{ts,js}'],
};
