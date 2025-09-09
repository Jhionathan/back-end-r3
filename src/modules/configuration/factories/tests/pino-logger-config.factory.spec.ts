import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { pinoLoggerConfigFactory } from '../pino-logger-config.factory';
import { pinoPrettyConfig } from '@modules/configuration/constants/pino-pretty-configuration.constant';

describe('pinoLoggerConfigFactory', () => {
  it('should return the correct value on production', async () => {
    const mockCfg = createMock<ConfigService>();

    jest.spyOn(mockCfg, 'get').mockReturnValueOnce('production');

    const { pinoHttp } = await pinoLoggerConfigFactory(mockCfg);

    expect(pinoHttp).toBeTruthy();
    expect(Object.keys(pinoHttp)).toHaveLength(5);
    expect(pinoHttp).toHaveProperty('level', 'info');
    expect(pinoHttp).toHaveProperty('autoLogging', true);
    expect(pinoHttp).toHaveProperty('transport', undefined);
    expect(pinoHttp).toHaveProperty('redact', [
      'req.headers.authorization',
      'body.password'
    ]);
    expect(pinoHttp).toHaveProperty('genReqId', expect.any(Function));

    expect(mockCfg.get).toHaveBeenCalledTimes(1);
    expect(mockCfg.get).toHaveBeenNthCalledWith(1, 'mode');
  });

  it('should return the correct value on development', async () => {
    const mockCfg = createMock<ConfigService>();

    jest.spyOn(mockCfg, 'get').mockReturnValueOnce('development');

    const { pinoHttp } = await pinoLoggerConfigFactory(mockCfg);

    expect(pinoHttp).toBeTruthy();
    expect(Object.keys(pinoHttp)).toHaveLength(5);
    expect(pinoHttp).toHaveProperty('level', 'trace');
    expect(pinoHttp).toHaveProperty('autoLogging', true);
    expect(pinoHttp).toHaveProperty('transport', pinoPrettyConfig);
    expect(pinoHttp).toHaveProperty('redact', [
      'req.headers.authorization',
      'body.password'
    ]);
    expect(pinoHttp).toHaveProperty('genReqId', expect.any(Function));

    expect(mockCfg.get).toHaveBeenCalledTimes(1);
    expect(mockCfg.get).toHaveBeenNthCalledWith(1, 'mode');
  });
});
