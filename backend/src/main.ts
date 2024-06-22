import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Adjust to the correct origin of your Angular app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  logger.log('Nest application is running on: http://localhost:3000');
}

bootstrap();
