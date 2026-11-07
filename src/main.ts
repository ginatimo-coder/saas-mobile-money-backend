import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation automatique des données entrantes (DTOs)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Activer les CORS pour autoriser les requêtes du futur frontend
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();