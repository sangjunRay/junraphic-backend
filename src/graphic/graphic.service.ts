import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphicEntity } from './entities/graphic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GraphicService {
  constructor(
    @InjectRepository(GraphicEntity)
    private readonly graphics: Repository<GraphicEntity>,
  ) {}
  getAllGraphics(): Promise<GraphicEntity[]> {
    return this.graphics.find();
  }
}
