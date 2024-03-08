import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = +process.env.PORT || 4000;
  await app.listen(PORT);
}
bootstrap();
