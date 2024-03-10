import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HeadersInterceptor } from './main/main.interceptor';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

const PORT: number = +process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HeadersInterceptor());

  const rootDir = dirname(__dirname);
  const API = await readFile(join(rootDir, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(API);

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
