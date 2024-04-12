import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    // .createSchemaIfNotExists(DatabaseSchema.aqIndex)
    // .then(() =>
    // trx.schema
    .hasTable(DatabaseTable.customers)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.customers,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.uuid('id').unique().notNullable().primary();
            tableBuilder.string('first_name').notNullable();
            tableBuilder.string('last_name').notNullable();
            tableBuilder.string('phone').notNullable();
            tableBuilder.string('email');
            tableBuilder.string('created_by').notNullable();
            tableBuilder.string('campaign_id');
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
    .dropTableIfExists(DatabaseTable.customers);
}
