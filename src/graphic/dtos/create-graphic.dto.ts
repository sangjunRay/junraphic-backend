import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { GraphicEntity } from '../entities/graphic.entity';
import { GeneralMutationOutput } from '../../common/dtos/general-output.dto';

@InputType()
export class CreateGraphicInput extends PickType(GraphicEntity, [
  'name',
  'description',
  'images',
  'categories',
]) {}

@ObjectType()
export class CreateGraphicOutput extends GeneralMutationOutput {}
