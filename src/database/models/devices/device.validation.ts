import { JSONSchema } from 'objection';

export const DeviceValidation: JSONSchema = {
  type: 'object',
  required: ['token', 'user_id'],
  title: 'Device Schema Validation',
  properties: {
    token: { type: 'string' },
    user_id: { type: 'string' },
  },
};
