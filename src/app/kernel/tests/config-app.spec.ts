import { createMock } from '@golevelup/ts-jest';
import { INestApplication } from '@nestjs/common';
import { configApp } from '../config-app';

describe('configApp', () => {
  const mockNestApplication = createMock<INestApplication>({
    useLogger: jest.fn().mockImplementation(),
    enableShutdownHooks: jest.fn().mockImplementation(),
    useGlobalPipes: jest.fn().mockImplementation(),
    useGlobalFilters: jest.fn().mockImplementation(),
    useGlobalInterceptors: jest.fn().mockImplementation(),
    enableCors: jest.fn().mockImplementation()
  });

  it('should be defined', () => {
    expect(mockNestApplication).toBeDefined();
  });

  it('should be called correctly', () => {
    configApp(mockNestApplication);

    expect(mockNestApplication.useLogger).toHaveBeenCalled();
    expect(mockNestApplication.enableShutdownHooks).toHaveBeenCalled();
    expect(mockNestApplication.useGlobalPipes).toHaveBeenCalled();
    expect(mockNestApplication.useGlobalFilters).toHaveBeenCalled();
    expect(mockNestApplication.useGlobalInterceptors).toHaveBeenCalled();
    expect(mockNestApplication.enableCors).toHaveBeenCalled();
  });
});
