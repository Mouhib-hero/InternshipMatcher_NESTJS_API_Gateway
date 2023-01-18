import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offer/offer.module';
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [AuthModule, OfferModule, ApplicationModule, ConfigModule.forRoot() ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
