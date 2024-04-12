import { Module, Global } from '@nestjs/common';
import knex from 'knex';
import { Model } from 'objection';
import {
  DbBaseModelModule,
  DbUserModule,
  DbPasswordResetModule,
  DbDeviceModule,
} from './models';
import { DATABASE_TOKEN } from './database.token';
import * as knexConfig from '../../knexfile';

const providers = [
  {
    provide: DATABASE_TOKEN.KnexConnection,
    useFactory: async () => {
      const knexClient = await knexConfig;
      const dbConnection = knex(knexClient);

      /*
       * @description: Initialize Knex instance -
       * giving objection access to db connection
       */
      Model.knex(dbConnection);

      // return an instance of knex db connection
      return dbConnection;
    },
  },
];

@Global()
@Module({
  providers,
  imports: [
    DbUserModule,
    DbBaseModelModule,
    DbPasswordResetModule,
    DbDeviceModule,
  ],
  exports: [
    DbUserModule,
    DbBaseModelModule,
    DbPasswordResetModule,
    DbDeviceModule,
  ],
})
export class DatabaseModule {}
