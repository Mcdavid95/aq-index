import { Model } from 'objection';
import { BaseModel } from '../base';
import { CallModel } from './call.service';
import { CallValidation } from './call.validation';

describe('CallModel', () => {
  describe('Call DB Model', () => {
    it('should return be define', () => {
      expect(CallModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(CallModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(CallModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a table name', () => {
      expect(CallModel.tableName).toBe('call-service.calls');
    });

    it('should have a json schema', () => {
      expect(CallModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(CallModel.jsonSchema).toEqual(CallValidation);
      expect(CallModel.jsonSchema.required).toEqual(['name']);
    });
  });
});
