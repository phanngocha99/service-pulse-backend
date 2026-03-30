/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 5000;

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Cho phép trình duyệt gửi/nhận cookie
  });
  await app.listen(port);
}
bootstrap();
