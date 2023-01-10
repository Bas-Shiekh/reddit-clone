import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ credentials: true, origin: true });
  await app.listen(8080);
}
bootstrap();
