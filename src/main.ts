import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { FreezePipe } from './pipes/freeze.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalPipes(new FreezePipe());
  await app.listen(3000);
}
bootstrap();
