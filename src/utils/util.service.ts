import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// import { EnvironmentService } from '../configs';
import { IJwtPayload } from './util.interface';
import { EnvironmentService } from '@aq-index/environment-service';
// import * as nanoid from 'nanoid';

@Injectable()
export class UtilService {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // generate jwt token
  public generateJwtToken(data: IJwtPayload): string {
    Logger.log('Running UtilService.generateJwtToken');

    try {
      const { id } = data;
      delete data.id;
      return jwt.sign(data, EnvironmentService.getValue('jwt_secret'), {
        audience: id,
      });
    } catch (e: any) {
      if (typeof e.code === 'string' || !e.code) {
        e.code = 500;
      }
      throw new InternalServerErrorException(e.message);
    }
  }

  // decode jwt token
  public decodeJwtToken(token: string): object | string | IJwtPayload {
    Logger.log('Running UtilService.decodeJwtToken');

    try {
      return jwt.verify(token, EnvironmentService.getValue('jwt_secret'));
    } catch (e: any) {
      if (typeof e.code === 'string' || !e.code) {
        e.code = 500;
      }
      throw new InternalServerErrorException(e.message, e.code);
    }
  }
  public generateOTP() {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }

    return OTP;
  }

  // public async generatePassword(): Promise<string> {
  //   return nanoid(8);
  // }
}
