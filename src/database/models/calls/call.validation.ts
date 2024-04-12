import { JSONSchema } from 'objection';

export const CallValidation: JSONSchema = {
  type: 'object',
  title: 'Call Schema Validation',
  required: ['phone', 'status'],
  properties: {
    created_by: { type: 'string' },
    phone: { type: 'string' },
    status: { type: 'string' },
    call_sid: { type: 'string' },
    campaign_id: { type: 'string' },
    customer_id: { type: 'string' },
    transcript: { type: 'string' },
    deleted_at: { type: 'string' },
  },
};
