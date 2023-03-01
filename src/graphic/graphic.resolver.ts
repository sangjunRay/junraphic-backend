import { Query, Resolver } from '@nestjs/graphql';
import { GraphicEntity } from './entities/graphic.entity';

@Resolver(() => GraphicEntity)
export class GraphicResolver {
  @Query(() => GraphicEntity)
  isGraphic() {
    return true;
  }
}
