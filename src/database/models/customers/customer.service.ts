import { JSONSchema } from 'objection';
import { Theme } from 'src/user';
import { DatabaseSchema } from '../../database.schema';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { ICustomer } from './customer.interface';
import { CustomerValidation } from './customer.validation';

export class CustomerModel extends BaseModel implements ICustomer {
  public id: ICustomer['id'];
  public created_by: ICustomer['created_by'];
  public first_name: ICustomer['first_name'];
  public last_name: ICustomer['last_name'];
  public email: ICustomer['email'];
  public campaign_id: ICustomer['campaign_id'];
  public phone: ICustomer['phone'];
  public deleted_at: ICustomer['deleted_at'];
  public created_at: ICustomer['created_at'];

  static get tableName() {
    return `${DatabaseTable.customers}`;
  }

  static get jsonSchema(): JSONSchema {
    return CustomerValidation;
  }

  static get relationMappings() {
    return {
      // subscription: {
      //   relation: BaseModel.BelongsToOneRelation,
      //   modelClass: `../subscription`,
      //   join: {
      //     from: `${DatabaseTable.subscriptions}.id`,
      //     to: `${DatabaseTable.deployments}.subscription_id`,
      //   },
      // },
      // organization: {
      //   relation: BaseModel.BelongsToOneRelation,
      //   modelClass: `../organization`,
      //   join: {
      //     from: `${DatabaseTable.organizations}.id`,
      //     to: `${DatabaseTable.deployments}.organization_id`,
      //   },
      // },
      // passwordResets: {
      //   relation: BaseModel.HasManyRelation,
      //   modelClass: `../passwordResets`,
      //   join: {
      //     from: `${DatabaseTable.users}.id`,
      //     to: `${DatabaseTable.password_resets}.user_id`,
      //   },
      // },
      // devices: {
      //   relation: BaseModel.HasManyRelation,
      //   modelClass: `../devices`,
      //   join: {
      //     from: `${DatabaseTable.users}.id`,
      //     to: `${DatabaseTable.devices}.user_id`,
      //   },
      // },
    };
  }
}
