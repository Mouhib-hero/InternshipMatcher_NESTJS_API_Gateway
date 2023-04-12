import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
import { HealthIndicator } from './interfaces/health-indicator.interface';
import { AppSvcConnectivityHealthIndicator } from './models/app-svc-connectivity-health.indicator';
import { AuthSvcConnectivityHealthIndicator } from './models/auth-svc-connectivity-health.indicator';
import { NestjsHealthIndicator } from './models/nestjs-health.indicator';
import { OfferSvcConnectivityHealthIndicator } from './models/offer-svc-connectivity-health.indicator';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private promClientService: PrometheusService
  ) {
    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(
        this.http,
        'http://localhost:3001',
        this.promClientService
      ),
      //new AppSvcConnectivityHealthIndicator(this.http,process.env.HOSTAPP, this.promClientService),
      //new AuthSvcConnectivityHealthIndicator(this.http,process.env.HOSTAUTH, this.promClientService),
      //new OfferSvcConnectivityHealthIndicator(this.http,process.env.HOSTOFFER, this.promClientService),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    return await this.health.check(
      this.listOfThingsToMonitor.map(
        (apiIndicator: HealthIndicator) => async () => {
          try {
            return await apiIndicator.isHealthy();
          } catch (e) {
            Logger.warn(e);
            return apiIndicator.reportUnhealthy();
          }
        }
      )
    );
  }
}