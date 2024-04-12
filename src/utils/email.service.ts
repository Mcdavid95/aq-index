import { EnvironmentService } from '@aq-index/environment-service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// import { EnvironmentService } from '../configs';

const env = EnvironmentService.getAll();

const transporter: nodemailer.Transporter = nodemailer.createTransport({
  pool: true,
  host: env.mail_host,
  port: env.mail_port,
  secure: true, // use TLS
  auth: {
    user: env.mail_user,
    pass: env.mail_password,
  },
});

@Injectable()
export class EmailService {
  public async sendEmail(data: IComposeEmail) {
    Logger.log('Running EmailService::sendEmail');
    try {
      // verify connection configuration
      await transporter.verify();

      Logger.log('Sending email to: ' + data.to);
      // Send the email
      return await transporter.sendMail({
        from: `'PlutoAI Team' <${env.mail_user}>`,
        ...data,
      });
    } catch (e: any) {
      console.log(e);
      //   if (typeof e.code === 'string' || !e.code) {
      //     e.code = HttpStatusCode.INTERNAL_SERVER_ERROR
      //   }
      throw new InternalServerErrorException(e.message);
    }
  }
}

export interface IComposeEmail {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
}
