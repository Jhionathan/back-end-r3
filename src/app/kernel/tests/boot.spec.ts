import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';
import { boot } from '../boot';
import { INestApplication, Logger } from '@nestjs/common';

describe('boot', () => {
  const mockConfigService = createMock<ConfigService>();
  const mockAppApplication = createMock<INestApplication>({
    listen: jest.fn().mockImplementation((port, callback?: () => void) => {
      callback();
    })
  });

  beforeEach(() => {
    jest.spyOn(mockConfigService, 'get').mockReturnValue(3000);
    jest.spyOn(mockAppApplication, 'get').mockReturnValue(mockConfigService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(mockConfigService).toBeDefined();
    expect(mockAppApplication).toBeDefined();
  });

  it('Should be called correctly', () => {
    jest.spyOn(Logger, 'log').mockImplementation();

    boot(mockAppApplication);

    expect(mockAppApplication.get).toHaveReturnedWith(mockConfigService);
    expect(mockConfigService.get).toHaveReturnedWith(3000);
    expect(mockAppApplication.listen).toHaveBeenCalled();
    expect(Logger.log).toHaveBeenCalled();
  });
});
