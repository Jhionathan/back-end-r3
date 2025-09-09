import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  liveness() {
    return {
      status: 'ok',
      info: {
        r3_suprimentos: {
          status: 'up'
        }
      },
      error: {},
      details: {
        r3_suprimentos: {
          status: 'up'
        }
      }
    };
  }
}
