import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';
import { pinoPrettyConfig } from '../constants/pino-pretty-configuration.constant';

export const pinoLoggerConfigFactory = async (
  cfg: ConfigService
): Promise<Params> => {
  const mode = cfg.get<string>('mode');

  return {
    pinoHttp: {
      level: mode !== 'production' ? 'trace' : 'info',
      transport: mode === 'development' ? pinoPrettyConfig : undefined,
      autoLogging: true,
      redact: ['req.headers.authorization', 'body.password'],
      //genReqId: getRequestId
    }
  };
};
