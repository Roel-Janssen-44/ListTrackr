import NextAuth from 'next-auth';
import PostgresAdapter from '@auth/pg-adapter';
import authConfig from './auth.config';

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: 'jwt' },
  debug: true,
  ...authConfig,
});
