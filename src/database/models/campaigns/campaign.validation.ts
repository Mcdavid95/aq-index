import { JSONSchema } from 'objection';

export const CampaignValidation: JSONSchema = {
  type: 'object',
  title: 'Campaign Schema Validation',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    plan: { type: 'string' },
    company: { type: 'string' },
    description: { type: 'string' },
    start_date: { type: 'string' },
    end_date: { type: 'string' },
    website_url: { type: 'string' },
    created_by: { type: 'string' },
  },
};
