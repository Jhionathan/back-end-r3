import { createMock } from '@golevelup/ts-jest';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { generateSwagger } from '../generate-swagger';
import { RequestHandler } from '@nestjs/common/interfaces';

jest.mock('@nestjs/swagger', () => ({
  ...jest.requireActual('@nestjs/swagger'),
  SwaggerModule: {
    createDocument: jest.fn(),
    setup: jest.fn()
  }
}));

describe('generateSwagger', () => {
  const mockConfigService = createMock<ConfigService>();

  const mockRes = createMock({
    json: jest.fn().mockImplementation()
  });

  const mockNestApplication = createMock<INestApplication>({
    get: jest.fn().mockReturnValue(mockConfigService),
    getHttpAdapter: jest.fn().mockReturnValue({
      get: jest
        .fn()
        .mockImplementation(
          (
            name: string,
            callback: (req: unknown, res: unknown) => RequestHandler
          ) => {
            callback(name, mockRes);
          }
        )
    })
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mockConfigService).toBeDefined();
    expect(mockNestApplication).toBeDefined();
  });

  it('should be called correctly', () => {
    jest.spyOn(mockConfigService, 'get').mockReturnValue('');
    jest.spyOn(mockConfigService, 'get').mockReturnValue('development');
    jest.spyOn(SwaggerModule, 'createDocument').mockImplementation();

    generateSwagger(mockNestApplication);

    expect(mockConfigService.get).toHaveBeenCalledTimes(2);
    expect(mockNestApplication.getHttpAdapter().get).toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalled();
  });

  it('should be returned with mode is production', () => {
    jest.spyOn(mockConfigService, 'get').mockReturnValue('');
    jest.spyOn(mockConfigService, 'get').mockReturnValue('production');

    generateSwagger(mockNestApplication);

    expect(mockConfigService.get).toHaveBeenCalledTimes(2);
    expect(mockConfigService.get).toHaveBeenNthCalledWith(2, 'mode');
  });
});
