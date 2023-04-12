import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module';
import { PrometheusModule } from './prometheus/prometheus.module';
import { MetricsModule } from './metrics/metrics.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, OfferModule, ApplicationModule, ConfigModule.forRoot(), HealthModule, PrometheusModule, MetricsModule, HttpModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
