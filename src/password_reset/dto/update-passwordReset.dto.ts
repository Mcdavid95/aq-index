import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordResetDto } from './create-passwordReset.dto';

export class UpdatePasswordResetDto extends PartialType(
  CreatePasswordResetDto,
) {}
