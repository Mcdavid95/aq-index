import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    // .createSchemaIfNotExists(DatabaseSchema.aqIndex)
    // .then(() =>
    // trx.schema
    .hasTable(DatabaseTable.campaigns)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.campaigns,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.uuid('id').unique().notNullable().primary();
            tableBuilder.string('name').notNullable();
            tableBuilder.string('type').notNullable();
            tableBuilder.string('plan').notNullable();
            tableBuilder.string('company');
            tableBuilder.string('website_url');
            tableBuilder.string('description').notNullable();
            tableBuilder.uuid('created_by').notNullable();
            tableBuilder.dateTime('start_date');
            tableBuilder.dateTime('end_date');
            tableBuilder.datetime('deleted_at');
            tableBuilder.timestamps(true, true);
          },
        );
      }
    })
    .catch((e) => console.error('MIGRATION_ERROR', e));
  // );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(DatabaseSchema.aqIndex)
    .dropTableIfExists(DatabaseTable.campaigns);
}
