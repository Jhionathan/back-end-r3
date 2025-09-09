import { createMock } from '@golevelup/ts-jest';
import { HealthController } from '../health.controller';
import { HealthService } from '@modules/health/services/health.service';

describe('HealthController', () => {
  const healthService = createMock<HealthService>();

  const makeSut = () => new HealthController(healthService);

  it('should be defined', () => {
    expect(healthService).toBeDefined();
  });

  describe('live', () => {
    it('should be called correctly', () => {
      const sut = makeSut();

      sut.liveness();

      expect(healthService.liveness).toHaveBeenCalled();
    });
  });
});
