import { Model } from 'objection';
import { BaseModel } from '../base';
import { CampaignModel } from './campaign.service';
import { CampaignValidation } from './campaign.validation';
import { DatabaseTable } from '../../database.tables';

describe('CampaignModel', () => {
  describe('Campaign DB Model', () => {
    it('should return be define', () => {
      expect(CampaignModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(CampaignModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(CampaignModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a table name', () => {
      expect(CampaignModel.tableName).toBe(DatabaseTable.campaigns);
    });

    it('should have a json schema', () => {
      expect(CampaignModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(CampaignModel.jsonSchema).toEqual(CampaignValidation);
      expect(CampaignModel.jsonSchema.required).toEqual(['name']);
    });
  });
});
