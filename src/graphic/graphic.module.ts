import { Module } from '@nestjs/common';
import { GraphicResolver } from './graphic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphicEntity } from './entities/graphic.entity';
import { GraphicService } from './graphic.service';

@Module({
  imports: [TypeOrmModule.forFeature([GraphicEntity])],
  providers: [GraphicResolver, GraphicService],
})
export class GraphicModule {}
