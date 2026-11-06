<<<<<<< HEAD

=======
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
=======
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
>>>>>>> f53be801812e677f221d1bae063d2bc525236fbf
