/**
 * CareerBuild Shared User Database Service
 * Provides user lookup, registration, and email existence verification.
 */

// Shared global runtime user database (Starts 100% Empty)
global.userDb = new Map();
global.userProfileStore = null;
global.otpStore = new Map();

export async function findUserByEmail(email) {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();

  // Check Prisma DB if DATABASE_URL is configured
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      if (prisma?.user) {
        const dbUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
        if (dbUser) return dbUser;
      }
    } catch (err) {
      console.warn("[User DB Notice] Prisma query error, falling back to shared store:", err.message);
    }
  }

  // Fallback to shared in-memory user store
  return global.userDb.get(cleanEmail) || null;
}

export async function registerUserInDb(user) {
  if (!user || !user.email) return null;
  const cleanEmail = user.email.toLowerCase().trim();

  const userObj = {
    id: user.id || "usr_" + Math.random().toString(36).substring(2, 9),
    name: user.name || cleanEmail.split("@")[0],
    email: cleanEmail,
    plan: user.plan || "FREE",
    createdAt: new Date().toISOString(),
  };

  global.userDb.set(cleanEmail, userObj);

  // If Prisma database connection exists, attempt async save
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      if (prisma?.user) {
        await prisma.user.upsert({
          where: { email: cleanEmail },
          update: { name: userObj.name },
          create: { email: cleanEmail, name: userObj.name },
        });
      }
    } catch (err) {
      console.warn("[User DB Notice] Prisma upsert error:", err.message);
    }
  }

  return userObj;
}

export function clearUserDb() {
  global.userDb.clear();
  global.userProfileStore = null;
  if (global.otpStore) global.otpStore.clear();
}
