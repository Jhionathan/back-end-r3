import { createMock } from '@golevelup/ts-jest';
import { INestApplication } from '@nestjs/common';
import { configSentry } from '../config-sentry';
import * as Sentry from '@sentry/node';
import { ConfigService } from '@nestjs/config';

jest.mock('@sentry/node', () => ({
  ...jest.requireActual('@sentry/node'),
  init: jest.fn().mockImplementation()
}));

describe('configSentry', () => {
  const mockConfigService = createMock<ConfigService>();
  const mockNestApplication = createMock<INestApplication>({
    use: jest.fn().mockImplementation(),
    get: jest.fn().mockReturnValue(mockConfigService)
  });

  beforeAll(() => {});

  it('should be defined', () => {
    expect(mockConfigService).toBeDefined();
    expect(mockNestApplication).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be called correctly', () => {
    jest.spyOn(mockNestApplication, 'get').mockReturnValue(mockConfigService);
    jest.spyOn(mockConfigService, 'get').mockReturnValue(true);

    configSentry(mockNestApplication);

    expect(mockConfigService.get).toHaveNthReturnedWith(1, true);
    expect(mockConfigService.get).toHaveBeenCalledTimes(3);
    expect(mockNestApplication.use).toHaveBeenCalledTimes(2);
    expect(Sentry.init).toHaveBeenCalled();
  });

  it('should be returned void if is production', () => {
    jest.spyOn(mockNestApplication, 'get').mockReturnValue(mockConfigService);
    jest.spyOn(mockConfigService, 'get').mockReturnValue('');

    configSentry(mockNestApplication);

    expect(mockConfigService.get).toHaveNthReturnedWith(1, '');
    expect(mockConfigService.get).toHaveBeenCalledTimes(3);
    expect(mockNestApplication.use).toHaveBeenCalledTimes(2);
  });
});
