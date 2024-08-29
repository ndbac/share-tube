import { INestApplication } from '@nestjs/common';
import config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initializeSwaggerDoc(app: INestApplication) {
  const serviceName = config.get<string>('service.name');
  const serviceDescription = config.get<string>('service.description');
  const apiVersion = config.get<string>('service.apiVersion');

  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API spec`)
    .setDescription(serviceDescription)
    .setVersion(apiVersion)
    .addServer(
      `${config.get('server.swaggerSchema')}://${config.get(
        'server.hostname',
      )}${config.get('service.baseUrl')}`,
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(
    config.get<string>('service.docsBaseUrl'),
    app,
    document,
    {
      swaggerOptions: {
        displayOperationId: true,
        persistAuthorization: true,
      },
      customSiteTitle: serviceName,
    },
  );
}
