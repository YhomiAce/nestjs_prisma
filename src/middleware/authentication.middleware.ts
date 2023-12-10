import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from '../request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(private readonly requestService: RequestService) {}
  use(req: Response, res: Request, next: NextFunction) {
    this.logger.log(AuthenticationMiddleware.name);
    // Authenticate the reuest
    const userId = '12345';
    this.requestService.setUserId(userId);
    next();
  }
}
