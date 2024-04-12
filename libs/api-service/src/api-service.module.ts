import { Module } from '@nestjs/common';
import { APIService } from './api-service.service';

@Module({
  providers: [APIService],
  exports: [APIService],
})
export class ApiServiceModule {}
