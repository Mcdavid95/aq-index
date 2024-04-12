import { Model } from 'objection';
import { BaseModel } from '../base';
import { CustomerModel } from './customer.service';
import { CustomerValidation } from './customer.validation';
import { DatabaseTable } from '../../database.tables';

describe('CustomerModel', () => {
  describe('Customer DB Model', () => {
    it('should return be define', () => {
      expect(CustomerModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(CustomerModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(CustomerModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a table name', () => {
      expect(CustomerModel.tableName).toBe(DatabaseTable.deployments);
    });

    it('should have a json schema', () => {
      expect(CustomerModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(CustomerModel.jsonSchema).toEqual(CustomerValidation);
      expect(CustomerModel.jsonSchema.required).toEqual(['first_name', 'last_name', 'created_by', 'phone']);
    });
  });
});
