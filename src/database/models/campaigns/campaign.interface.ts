import { IBase } from '../base';

export interface ICampaign extends IBase {
  name: string;
  type: string;
  plan: string;
  company: string;
  description: string;
  start_date: Date;
  end_date: Date;
  website_url?: string;
  created_by: string;
  deleted_at?: Date;
}
