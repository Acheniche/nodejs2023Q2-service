import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HeadersInterceptor } from './main/main.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = +process.env.PORT || 4000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HeadersInterceptor());
  await app.listen(PORT);
}
bootstrap();
