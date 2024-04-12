import { IBase } from '../base';

export interface IDevice extends IBase {
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
