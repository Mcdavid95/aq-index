import { Module } from '@nestjs/common';
import { PasswordResetService } from './passwordReset.service';
import { PasswordResetRepository } from './passwordReset.repository';

@Module({
  providers: [PasswordResetService, PasswordResetRepository],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
