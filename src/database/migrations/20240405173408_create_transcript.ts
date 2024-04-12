import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    // .createSchemaIfNotExists(DatabaseSchema.aqIndex)
    // .then(() =>
    // trx.schema
    .hasTable(DatabaseTable.transcripts)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.transcripts,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.uuid('id').unique().notNullable().primary();
            tableBuilder.string('call_id').notNullable();
            tableBuilder.string('by');
            tableBuilder.text('text');
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
    .dropTableIfExists(DatabaseTable.transcripts);
}
