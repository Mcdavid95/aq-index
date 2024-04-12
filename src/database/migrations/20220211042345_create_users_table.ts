import { Knex } from 'knex';
import { DatabaseSchema } from '../database.schema';
import { DatabaseTable } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  // return knex.transaction(async (trx: Knex.Transaction) =>
  knex.schema
    // .createSchemaIfNotExists(DatabaseSchema.callCenterService)
    // .then(() =>
    // trx.schema
    .hasTable(DatabaseTable.users)
    .then((tableExists: boolean) => {
      if (!tableExists) {
        return knex.schema.createTable(
          DatabaseTable.users,
          (tableBuilder: Knex.CreateTableBuilder) => {
            tableBuilder.uuid('id').unique().notNullable().primary();
            tableBuilder.string('password').notNullable();
            tableBuilder.string('first_name').notNullable();
            tableBuilder.string('last_name').notNullable();
            tableBuilder.string('otp');
            tableBuilder.string('preferred_theme');
            tableBuilder.string('email').unique().notNullable();
            tableBuilder.boolean('email_verified').defaultTo(false);
            tableBuilder.string('phone').unique();
            tableBuilder.boolean('phone_verified').defaultTo(false);
            tableBuilder.boolean('is_subscribed').defaultTo(false);
            tableBuilder.string('logo');
            tableBuilder.integer('login_count').defaultTo(0);
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
    .dropTableIfExists(DatabaseTable.users);
}
