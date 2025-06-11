import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Energy API')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  try {
    SwaggerModule.setup('/api', app, document);
  } catch (error) {
    this.logger.error(error);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
