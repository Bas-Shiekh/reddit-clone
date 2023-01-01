import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(403).send({ error: 'No Authentication Token Provide' });
    // if (authorization !== 'Bearer 123')
    //   return res
    //     .status(403)
    //     .send({ error: 'not equal No Authentication Token Provide' });
    next();
  }
}
