import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OFFER_PACKAGE_NAME, OFFER_SERVICE_NAME } from './offer.pb';
import { OfferController } from './offer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
    ]),ConfigModule.forRoot()
  ],
  controllers: [OfferController],
})
export class OfferModule {}
