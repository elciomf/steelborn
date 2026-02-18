import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = process.env.PORT || 3000;

  await app.listen(port);
}

bootstrap();
