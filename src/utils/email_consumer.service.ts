import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailQueueConsumer {
  @Inject(EmailService) emailService: EmailService;

  @MessagePattern('email')
  async sendEmail(@Payload() data: any, @Ctx() context: RedisContext) {
    Logger.log('Running EmailConsumer::sendEmail');
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    await this.emailService.sendEmail({
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
  }
}
