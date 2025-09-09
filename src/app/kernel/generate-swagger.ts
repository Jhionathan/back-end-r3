import { swaggerInfo } from '@common/constants/swagger-info.constant';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const generateSwagger = (app: INestApplication) => {
  const cfg = app.get(ConfigService);

  const version = cfg.get<string>('version');
  const mode = cfg.get<string>('mode');

  if (mode === 'production') return;

  const config = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .addBearerAuth(
      {
        type: 'http',
        description: 'Token de usuário'
      },
      'TokenUser'
    )
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/swagger.json', (_, res) => {
    return res.json(document);
  });

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
};
