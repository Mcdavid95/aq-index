import { JSONSchema } from 'objection';
import { DatabaseSchema } from '../../database.schema';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IDevice } from './device.interface';
import { DeviceValidation } from './device.validation';

export class DeviceModel extends BaseModel implements IDevice {
  public id: IDevice['id'];
  public token: IDevice['token'];
  public user_id: IDevice['user_id'];
  public created_at: IDevice['created_at'];
  public updated_at: IDevice['updated_at'];

  static get tableName() {
    return `${DatabaseSchema.aqIndex}.${DatabaseTable.devices}`;
  }

  static get jsonSchema(): JSONSchema {
    return DeviceValidation;
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `../users`,
        join: {
          from: `${DatabaseSchema.aqIndex}.${DatabaseTable.devices}.user_id`,
          to: `${DatabaseSchema.aqIndex}.${DatabaseTable.users}.id`,
        },
      },
    };
  }
}
