import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TerminusModule } from "@nestjs/terminus";
import { PrometheusModule } from '../prometheus/prometheus.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TerminusModule, PrometheusModule, AuthModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService]
})
export class HealthModule {}