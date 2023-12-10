import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard)
  // @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 13;
    return 'Example';
  }

  @Get('error')
  @UseFilters(HttpExceptionFilter)
  getError(): string {
    throw new InternalServerErrorException('Server error');
  }
}
