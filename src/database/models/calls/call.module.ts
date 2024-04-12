import { Module } from '@nestjs/common';
import { CallModel } from './call.service';

@Module({
  providers: [CallModel],
  exports: [CallModel],
})
export class DbCallModule {}
