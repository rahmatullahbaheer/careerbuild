/**
 * CareerBuild Pure Native PostgreSQL User Database Service
 * Uses native PostgreSQL `pg` driver to connect directly to Supabase PostgreSQL.
 * 100% Prisma-free.
 */

import { queryPg } from "@/lib/postgres";

// Transient OTP Memory Store
if (!global.otpStore) {
  global.otpStore = new Map();
}

/**
 * Ensure public.users table exists in PostgreSQL database
 */
async function ensureUsersTableExists() {
  const createTableQuery = `
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
  `;
  try {
    await queryPg(createTableQuery);
  } catch (err) {
    console.error("[PostgreSQL Schema Notice] Table creation check:", err.message);
  }
}

// Initial table check
ensureUsersTableExists();

/**
 * Find user by email directly from PostgreSQL database
 */
export async function findUserByEmail(email) {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();

  try {
    const res = await queryPg(
      `SELECT * FROM public.users WHERE email = $1 LIMIT 1;`,
      [cleanEmail]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error("[Native PG Find Error] Failed to find user by email:", err.message);
    throw err;
  }
}

/**
 * Register or update user record directly in PostgreSQL database using ON CONFLICT (email)
 */
export async function registerUserInDb(user) {
  if (!user || !user.email) return null;
  const cleanEmail = user.email.toLowerCase().trim();
  const userId = user.id || "usr_" + Math.random().toString(36).substring(2, 10);
  const userName = user.name || cleanEmail.split("@")[0];
  const userPassword = user.password || null;
  const userImage = user.image || null;
  const userJobTitle = user.jobTitle || "Senior Software Engineer";
  const userPortfolio = user.portfolio || "";
  const userPlan = user.plan || "CareerBuild PRO Plan";

  try {
    const upsertQuery = `
      INSERT INTO public.users (id, name, email, password, image, "jobTitle", portfolio, plan, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      ON CONFLICT (email) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        password = COALESCE(EXCLUDED.password, public.users.password),
        image = COALESCE(EXCLUDED.image, public.users.image),
        "jobTitle" = COALESCE(EXCLUDED."jobTitle", public.users."jobTitle"),
        portfolio = COALESCE(EXCLUDED.portfolio, public.users.portfolio),
        "updatedAt" = NOW()
      RETURNING *;
    `;

    const res = await queryPg(upsertQuery, [
      userId,
      userName,
      cleanEmail,
      userPassword,
      userImage,
      userJobTitle,
      userPortfolio,
      userPlan,
    ]);

    const savedUser = res.rows[0];
    console.log(`[Native PG DB] Successfully saved user ${cleanEmail} (ID: ${savedUser.id})`);
    return savedUser;
  } catch (err) {
    console.error("[Native PG Register Error] Failed to register user:", err.message);
    throw err;
  }
}

/**
 * Update user password directly in PostgreSQL database
 */
export async function updateUserPasswordInDb(email, password) {
  if (!email || !password) return null;
  const cleanEmail = email.toLowerCase().trim();

  try {
    const updateQuery = `
      UPDATE public.users 
      SET password = $1, "updatedAt" = NOW() 
      WHERE email = $2 
      RETURNING *;
    `;
    const res = await queryPg(updateQuery, [password, cleanEmail]);
    const updatedUser = res.rows[0];
    console.log(`[Native PG DB] Updated password for user ${cleanEmail}`);
    return updatedUser;
  } catch (err) {
    console.error("[Native PG Password Update Error]:", err.message);
    throw err;
  }
}

/**
 * Clear all records in PostgreSQL database
 */
export async function clearUserDb() {
  try {
    await queryPg("DELETE FROM public.users;");
    if (global.otpStore) global.otpStore.clear();
    console.log("[Native PG DB] Cleared all users from PostgreSQL database.");
  } catch (err) {
    console.error("[Native PG Clear Error]:", err.message);
  }
}
