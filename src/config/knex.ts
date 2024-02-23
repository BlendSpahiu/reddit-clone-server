import Knex from 'knex';

export const DATABASE_HOSTNAME = process.env.DB_HOSTNAME;
export const DATABASE_PORT = process.env.DB_PORT;
export const DATABASE_USERNAME = process.env.DB_USERNAME;
export const DATABASE_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_DIALECT = process.env.DB_DIALECT;
export const DATABASE_NAME = process.env.DB_NAME;

const connectionString = `${DATABASE_DIALECT}://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@127.0.0.1:${DATABASE_PORT}/${DATABASE_NAME}`;

export const knexConfig: Knex.Config = {
  client: 'pg',
  connection: encodeURI(connectionString),
  pool: {
    min: 0,
    max: 95,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
