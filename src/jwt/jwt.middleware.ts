import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-auth' in req.headers) {
      const token = req.headers['x-auth'];
      try {
        const decodedToken = this.jwtService.verify(token as string);
        if (
          typeof decodedToken === 'object' ||
          decodedToken.hasOwnProperty('id')
        ) {
          const user = await this.userService.findById(decodedToken['id']);
          req['user'] = user;
        }
      } catch (error) {
        return new InternalServerErrorException(error);
      }
    }
    next();
  }
}
