import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';

@ApiTags('Módulo de Health Check')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @ApiBearerAuth('TokenUser')
  liveness() {
    return this.healthService.liveness();
  }
}
