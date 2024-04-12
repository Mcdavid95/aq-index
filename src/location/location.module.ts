import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { APIService } from '@aq-index/api-service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, APIService],
})
export class LocationModule {}
