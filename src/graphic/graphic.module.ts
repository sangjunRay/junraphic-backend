import { Module } from '@nestjs/common';
import { GraphicResolver } from './graphic.resolver';

@Module({
  imports: [GraphicResolver],
})
export class GraphicModule {}
