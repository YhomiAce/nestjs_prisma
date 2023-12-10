import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from 'src/request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  constructor(private readonly requestService: RequestService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgenet = request.get('user-agent') || '';
    const { ip, method, path: url } = request;
    this.logger.log(
      `method: ${method}, url: ${url}, userAgent: ${userAgenet}, ip: ${ip}, class: ${
        context.getClass().name
      }, functionInClassBeingCalled: ${context.getHandler().name} `,
    );
    this.logger.debug('userId: ', this.requestService.getUserId());
    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        this.logger.log(`
        method: ${method}, url: ${url}, status: ${statusCode}, content:${contentLength},
        userAgent: ${userAgenet}, ip: ${ip}, totalTime: ${Date.now() - now}ms
        `);
        this.logger.debug('Response: ', res);
      }),
    );
    // return null;
  }
}
