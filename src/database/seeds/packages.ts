import { Knex } from 'knex';
import { DatabaseTable } from '../database.tables';

import { v4 as uuid } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DatabaseTable.campaigns).del();

  // Inserts seed entries
  await knex(DatabaseTable.campaigns).insert([
    {
      id: uuid(),
      name: 'cloak_backend',
      info_details: `{package_id: 'clk-5678',versions: [1],requires: {  db_name: [],db_user: [],backend_port: [],db_password: [],machine: [],},description: 'Simple to use Postgres DB Server',fee: 120}`,
    },

    {
      id: uuid(),
      name: 'postgres_db',
      info_details: `{package_id: 'pg-ent4567',versions: [1],requires: { db_name: [], db_password: [], machine: [] },description: 'Simple to use Postgres DB Server',fee: 120}`,
    },

    {
      id: uuid(),
      name: 'sonalysis',
      info_details: `{package_id: 'sona-5705',versions: [1],requires: { provider: ['digitalocean'], structure: ['k8s'] },description: 'AI Co-pilot for Football Coaches',fee: 567}`,
    },

    {
      id: uuid(),
      name: 'talentsphere',
      info_details: `{package_id: 'tls-ent5705',versions: [1],requires: { provider: ['digitalocean'], structure: ['k8s'] },description: 'Connecting Talents to Oportunities',fee: 567}`,
    },

    {
      id: uuid(),
      name: 'lafia',
      info_details: `{package_id: 'lafia-ent575',versions: [1],requires: { provider: ['digitalocean'], structure: ['k8s'] },description: 'Your Health Digitalized',fee: 567}`,
    },

    {
      id: uuid(),
      name: 'sonalysis_web',
      info_details: `{package_id: 'sona-web4567',versions: [1],fee: 20,description: 'An Interactive Web Application for Analysing Soccer Videos Using Top Notch AI Algorithm',requires: {  webport: ['8080'],  machine: [],  organization_name: ['*user.organization_name*'],  logo: ['*user.logo*'],  preferred_theme: ['*user.preferred_theme*'],}}`,
    },
  ]);
}
