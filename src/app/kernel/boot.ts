import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const boot = (app: INestApplication) => {
  const cfg = app.get(ConfigService);
  const port = cfg.get<number>('port');

  app.listen(port, () => {
    Logger.log(`Server running on port ${port}`);
  });
};
