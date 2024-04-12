import { JSONSchema } from 'objection';

export const UserValidation: JSONSchema = {
  type: 'object',
  title: 'User Schema Validation',
  required: ['password', 'email'],
  properties: {
    first_name: { type: 'string' },
    last_name: { type: 'string' },
    organization_name: { type: 'string' },
    do_token: { type: 'string' },
    role: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    phone_verified: { type: 'boolean' },
    email: { type: 'string' },
    email_verified: { type: 'boolean' },
    logo: { type: 'string' },
    preferred_theme: { type: 'string' },
  },
};
