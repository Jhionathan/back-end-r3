/* istanbul ignore file */
import './app/kernel/tracer';
import { NestFactory } from '@nestjs/core';
import { configApp } from './app/kernel/config-app';
import { configSentry } from './app/kernel/config-sentry';
import { generateSwagger } from './app/kernel/generate-swagger';
import { boot } from './app/kernel/boot';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configApp(app);
  configSentry(app);
  generateSwagger(app);
  boot(app);
}
bootstrap();
