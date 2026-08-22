/**
 * CareerBuild Direct PostgreSQL Pool Driver (`pg`)
 * Provides direct connection pool access to Supabase PostgreSQL database.
 */

import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:careerbuild@12345@db.ymezdmtiuotiruvisagy.supabase.co:5432/postgres";

export const pgPool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function queryPg(text, params) {
  const start = Date.now();
  const res = await pgPool.query(text, params);
  const duration = Date.now() - start;
  console.log(`[PostgreSQL Native Query] Executed query in ${duration}ms - rows: ${res.rowCount}`);
  return res;
}

export default pgPool;
