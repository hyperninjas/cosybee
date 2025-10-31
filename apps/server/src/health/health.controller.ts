import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  HealthCheckError,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

import { PrismaClient } from '../../generated/client';

@Controller('health')
export class HealthController {
  private readonly prisma = new PrismaClient();

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @AllowAnonymous()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'server',
          'http://localhost:4000/api/auth/reference',
        ),
      () => this.checkDatabase(),
    ]);
  }

  private async checkDatabase(): Promise<HealthIndicatorResult> {
    try {
      await this.prisma.$executeRawUnsafe('SELECT 1');
      return { database: { status: 'up' } };
    } catch (error) {
      throw new HealthCheckError('Database check failed', error as Error);
    }
  }
}
