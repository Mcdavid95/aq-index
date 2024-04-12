import { IBase } from '../base';

export interface IUser extends IBase {
  first_name: string;
  last_name: string;
  role?: string;
  password: string;
  logo?: string;
  phone?: string;
  phone_verified?: boolean;
  otp?: string;
  email: string;
  email_verified?: boolean;
  is_active?: boolean;
  deleted_at?: Date;
  login_count?: number;
  isSubscribed?: boolean;
}
