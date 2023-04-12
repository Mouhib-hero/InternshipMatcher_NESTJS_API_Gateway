import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APPLICATION_SERVICE_NAME, APPLICATION_PACKAGE_NAME } from './application.pb';
import { ApplicationController } from './application.controller';
import { OFFER_PACKAGE_NAME, OFFER_SERVICE_NAME } from 'src/offer/offer.pb';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: APPLICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.HOSTAPP.concat(':50052'),
          package: APPLICATION_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/application.proto',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: OFFER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.HOSTOFFER.concat(':50053'),
          package: OFFER_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/offer.proto',
        },
      },
    ]),
  OfferModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

