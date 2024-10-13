import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from '@/app/lib/db_types';

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.POSTGRES_URL,
    }),
  }),
});

export default db;
