import { Query, Resolver } from '@nestjs/graphql';
import { GraphicEntity } from './entities/graphic.entity';
import { GraphicService } from './graphic.service';

@Resolver(() => GraphicEntity)
export class GraphicResolver {
  constructor(private readonly graphicService: GraphicService) {}
  @Query(() => GraphicEntity)
  isGraphic() {
    return true;
  }
}
