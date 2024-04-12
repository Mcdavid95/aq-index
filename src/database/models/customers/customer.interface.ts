import { IBase } from '../base';

export interface ICustomer extends IBase {
  first_name?: string;
  last_name: string;
  campaign_id: string;
  phone: string;
  email: boolean;
  deleted_at?: Date;
  created_by: string;
}
