/**
 * CareerBuild Direct PostgreSQL Pool Driver (`pg`)
 * Uses Supabase IPv4 Pooler to ensure 100% compatibility across IPv4/IPv6 networks.
 */

import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.ymezdmtiuotiruvisagy:careerbuild%4012345@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

export const pgPool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

let isInitialized = false;

/**
 * Auto-Initialize PostgreSQL Tables (`users`, `resumes`, `cover_letters`)
 */
export async function initDbSchema() {
  if (isInitialized) return;

  const createTablesSql = `
    CREATE TABLE IF NOT EXISTS public.users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255),
      image VARCHAR(500),
      "jobTitle" VARCHAR(255) DEFAULT 'Senior Software Engineer',
      portfolio TEXT DEFAULT '',
      plan VARCHAR(100) DEFAULT 'CareerBuild PRO Plan',
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS public.resumes (
      id VARCHAR(255) PRIMARY KEY,
      "userId" VARCHAR(255) REFERENCES public.users(id) ON DELETE CASCADE,
      title VARCHAR(255) DEFAULT 'Untitled Resume',
      content JSONB,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS public.cover_letters (
      id VARCHAR(255) PRIMARY KEY,
      "userId" VARCHAR(255) REFERENCES public.users(id) ON DELETE CASCADE,
      title VARCHAR(255) DEFAULT 'Untitled Cover Letter',
      content JSONB,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pgPool.query(createTablesSql);
    isInitialized = true;
    console.log("[PostgreSQL Auto DB] Successfully auto-created/verified all PostgreSQL database tables over IPv4.");
  } catch (err) {
    console.error("[PostgreSQL Auto DB Error] Table initialization error:", err.message);
  }
}

// Execute auto-initialization immediately
initDbSchema();

export async function queryPg(text, params) {
  if (!isInitialized) {
    await initDbSchema();
  }
  const start = Date.now();
  const res = await pgPool.query(text, params);
  const duration = Date.now() - start;
  console.log(`[PostgreSQL Native Query] Executed query in ${duration}ms - rows: ${res.rowCount}`);
  return res;
}

export default pgPool;
