import { Module } from '@nestjs/common';
import { Env } from './env.token';
import { EnvironmentService } from './environment-service.service';

@Module({
  providers: [
    {
      provide: Env.Token,
      useValue: EnvironmentService,
    },
  ],
  exports: [
    {
      provide: Env.Token,
      useValue: EnvironmentService,
    },
  ],
})
export class EnvironmentsModule {}
