import { HealthService } from '../health.service';

describe('HealthService', () => {
  const makeSut = () => new HealthService();

  describe('liveness', () => {
    it('should be called correctly', () => {
      const sut = makeSut();

      const response = sut.liveness();

      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('info');
      expect(response).toHaveProperty('error');
      expect(response).toHaveProperty('details');
    });
  });
});
