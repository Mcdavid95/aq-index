import { Model } from 'objection';
import { BaseModel } from '../base';
import { DeviceModel } from './device.service';
import { DeviceValidation } from './device.validation';

describe('DeviceModel', () => {
  describe('Device DB Model', () => {
    it('should return be define', () => {
      expect(DeviceModel).toBeDefined();
    });

    it('should extend Objection Model class', () => {
      expect(DeviceModel.prototype).toBeInstanceOf(Model);
    });

    it('should extend the BaseModel class', () => {
      expect(DeviceModel.prototype).toBeInstanceOf(BaseModel);
    });

    it('should have a table name', () => {
      expect(DeviceModel.tableName).toBe('cloak-service.devices');
    });

    it('should have a json schema', () => {
      expect(DeviceModel.jsonSchema).toBeDefined();
    });

    it('should have a schema validation', () => {
      expect(DeviceModel.jsonSchema).toEqual(DeviceValidation);
      expect(DeviceModel.jsonSchema.required).toEqual(['token', 'user_id']);
    });

    it('should have a relation to the User model', () => {
      expect(DeviceModel.relationMappings.user).toBeDefined();
    });
  });
});
