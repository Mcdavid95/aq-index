import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UtilModule } from './utils';
import { BaseModule } from './base';
import { PasswordResetModule } from './password_reset';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [
    LocationModule,
    UserModule,
    AuthModule,
    UtilModule,
    BaseModule,
    PasswordResetModule,
    GptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
