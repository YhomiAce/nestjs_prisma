import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.debug('Running HttpExceptionFilter...');
    this.logger.debug('Exception Message:', exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamps: new Date().toISOString(),
      path: request.url,
      message:
        exception.message ?? 'An Error occurred please contact developer',
    });
  }
}
