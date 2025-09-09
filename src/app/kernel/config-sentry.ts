import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Handlers, init } from '@sentry/node';

export const configSentry = (app: INestApplication) => {
  app.use(Handlers.requestHandler());
  app.use(Handlers.tracingHandler());

  const cfg = app.get(ConfigService);

  const dsn = cfg.get<string>('sentry.dsn');
  const mode = cfg.get<string>('mode');
  const version = cfg.get<string>('version');

  if (mode === 'development' || !dsn) return;

  init({
    dsn,
    environment: mode,
    release: version,
    tracesSampleRate: 1.0,
    sampleRate: 1.0
  });
};
