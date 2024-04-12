import { Module } from '@nestjs/common';
import { DeviceModel } from './device.service';

@Module({
  providers: [DeviceModel],
  exports: [DeviceModel],
})
export class DbDeviceModule {}
