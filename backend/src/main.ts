import { config as envConfig } from 'dotenv';
envConfig();
import { NestFactory } from '@nestjs/core';
import { initializeSwaggerDoc } from './shared/swagger.helpers';
import config from 'config';
import { generalValidationPipe } from './pipes/general-validation.pipe';
import express from 'express';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.setGlobalPrefix(config.get<string>('service.baseUrl'));
  app.enableCors({
    exposedHeaders: config.get<string>('server.cors.exposedHeaders'),
  });
  app.useGlobalPipes(generalValidationPipe);
  initializeSwaggerDoc(app);

  app.use(express.text({ type: 'text/plain' }));
  await app.listen(process.env.PORT || config.get<string>('server.port'));
}

bootstrap()
  .then(() => {
    console.log(`App is running: `, {
      address: `${config.get<string>(
        'server.swaggerSchema',
      )}://${config.get<string>('server.hostname')}`,
      apiBaseUrl: `${config.get<string>('service.baseUrl')}`,
      docsBaseUrl: `${config.get<string>('service.docsBaseUrl')}`,
    });
  })
  .catch((e) => {
    console.log(e, 'App exception occurs');
    process.exit(-1);
  });

// Callback to log uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err, 'uncaughtException');
});

// Callback to log unhandled exception
process.on('unhandledRejection', (reason: any, promise) => {
  console.log(
    {
      promise,
      reason,
      promiseStr: String(promise),
      reasonStr: String(reason),
      reasonStack: reason?.stack,
    },
    `unhandledRejection`,
  );
});
