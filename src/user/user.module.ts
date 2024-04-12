import { Module } from '@nestjs/common';
import { EmailService, UtilModule } from '../utils';
import { PasswordResetModule } from '../password_reset';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [
    UtilModule,
    PasswordResetModule,
    // BullModule.registerQueue({
    //   name: 'email',
    //   prefix: '',
    // }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
