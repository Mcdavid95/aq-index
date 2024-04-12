import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { EmailQueueConsumer } from './email_consumer.service';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

// @Global()
@Module({
  imports: [
    // BullModule.registerQueue({
    //   prefix: '',
    //   name: 'calls_tasks_queue',
    // }),
    ClientsModule.register([
      {
        name: 'CALL_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          // password: 'jfHWZfOJ4GqW5iLAzaJg6ZRD0ap0hyIl',
          // username: 'default',
        },
      },
    ]),
  ],
  controllers: [EmailQueueConsumer],
  providers: [UtilService, EmailService],
  exports: [
    UtilService,
    ClientsModule.register([
      {
        name: 'CALL_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          // password: 'jfHWZfOJ4GqW5iLAzaJg6ZRD0ap0hyIl',
          // username: 'default',
        },
      },
    ]),
  ],
})
export class UtilModule {}
