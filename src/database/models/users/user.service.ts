import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';

export class UserModel extends BaseModel implements IUser {
  public id: IUser['id'];
  public logo: IUser['logo'];
  public email: IUser['email'];
  public phone: IUser['phone'];
  public first_name: IUser['first_name'];
  public isSubscribed: IUser['isSubscribed'];
  public otp: IUser['otp'];
  public role: IUser['role'];
  public last_name: IUser['last_name'];
  public password: IUser['password'];
  public deleted_at: IUser['deleted_at'];
  public created_at: IUser['created_at'];
  public login_count: IUser['login_count'];
  public updated_at: IUser['updated_at'];
  public phone_verified: IUser['phone_verified'];
  public email_verified: IUser['email_verified'];

  static get tableName() {
    return `${DatabaseTable.users}`;
  }

  static get jsonSchema(): JSONSchema {
    return UserValidation;
  }

  // static get relationMappings() {
  // return {
  //   organizations: {
  //     relation: BaseModel.HasManyRelation,
  //     modelClass: `../organizations`,
  //     join: {
  //       from: `${DatabaseTable.users}.id`,
  //       to: `${DatabaseTable.organizations}.created_by`,
  //     },
  //   },
  //   organizationRoles: {
  //     relation: BaseModel.HasManyRelation,
  //     modelClass: `../organizationUsers`,
  //     join: {
  //       from: `${DatabaseTable.users}.id`,
  //       to: `${DatabaseTable.organizationUsers}.user_id`,
  //     },
  //   },
  // devices: {
  //   relation: BaseModel.HasManyRelation,
  //   modelClass: `../devices`,
  //   join: {
  //     from: `${DatabaseTable.users}.id`,
  //     to: `${DatabaseTable.devices}.user_id`,
  //   },
  // },
  // };
}
// }
