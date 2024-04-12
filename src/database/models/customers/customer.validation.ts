import { JSONSchema } from 'objection';

export const CustomerValidation: JSONSchema = {
  type: 'object',
  title: 'Customer Schema Validation',
  required: ['first_name', 'last_name', 'created_by', 'phone'],
  properties: {
    first_name: { type: 'string' },
    created_by: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    last_name: { type: 'string' },
    campaign_id: { type: 'string' },
    deleted_at: { type: 'string' },
  },
};
