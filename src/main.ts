import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer Swagger
  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('API pour gérer les tâches')
    .setVersion('1.0')
    .addBearerAuth() // Ajouter un token Bearer si vous utilisez l'authentification
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger sera accessible sur /api

  await app.listen(3000);
}
bootstrap();
