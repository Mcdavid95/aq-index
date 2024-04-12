import { IsString } from 'class-validator';

export class CreatePasswordResetDto {
  /**
   * PasswordReset's name
   */
  @IsString()
  token: string;

  /**
   * PasswordResets user
   */
  @IsString()
  user_id: string;
}
