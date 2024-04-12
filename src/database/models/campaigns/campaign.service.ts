import { JSONSchema } from 'objection';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { ICampaign } from './campaign.interface';
import { CampaignValidation } from './campaign.validation';

export class CampaignModel extends BaseModel implements ICampaign {
  public id: ICampaign['id'];
  public name: ICampaign['name'];
  public type: ICampaign['type'];
  public plan: ICampaign['plan'];
  public company: ICampaign['company'];
  public description: ICampaign['description'];
  public start_date: ICampaign['start_date'];
  public end_date: ICampaign['end_date'];
  public website_url?: ICampaign['website_url'];
  public deleted_at?: ICampaign['deleted_at'];
  public created_at: ICampaign['created_at'];
  public created_by: ICampaign['created_by'];

  static get tableName() {
    return `${DatabaseTable.campaigns}`;
  }

  static get jsonSchema(): JSONSchema {
    return CampaignValidation;
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: `../users`,
        join: {
          from: `${DatabaseTable.users}.id`,
          to: `${DatabaseTable.campaigns}.created_by`,
        },
      },
    };
  }
}
