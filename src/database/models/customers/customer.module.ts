import { Module } from '@nestjs/common';
import { CustomerModel } from './customer.service';

@Module({
  providers: [CustomerModel],
  exports: [CustomerModel],
})
export class DbCustomerModule {}
