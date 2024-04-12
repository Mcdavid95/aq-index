import { IBase } from '../base';

export interface ICall extends IBase {
  created_by?: string;

  call_sid?: string;

  phone: string;

  customer_id: string;

  campaign_id: string;

  transcript: string;

  status: string;

  deleted_at?: Date;
}
