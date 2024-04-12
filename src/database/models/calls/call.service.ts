import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { ICall } from './call.interface';
import { CallValidation } from './call.validation';

export class CallModel extends BaseModel implements ICall {
  public id: ICall['id'];
  public call_sid: ICall['call_sid'];
  public created_by: ICall['created_by'];
  public phone: ICall['phone'];
  public customer_id: ICall['customer_id'];
  public campaign_id: ICall['campaign_id'];
  public transcript: ICall['transcript'];
  public status: ICall['status'];
  public created_at: ICall['created_at'];
  public deleted_at: ICall['deleted_at'];

  static get tableName() {
    return `${DatabaseTable.calls}`;
  }

  static get jsonSchema(): JSONSchema {
    return CallValidation;
  }

  static get relationMappings() {
    return {};
  }
}
