/**
 * CareerBuild PostgreSQL Database Service for Resumes
 * Connects directly to PostgreSQL `resumes` table using `queryPg`.
 */

import { queryPg } from "@/lib/postgres";
import { ensureUserRecordExists } from "@/lib/userDb";

/**
 * Ensure `public.resumes` table exists
 */
export async function ensureResumesTableExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS public.resumes (
      id VARCHAR(255) PRIMARY KEY,
      "userId" VARCHAR(255) NOT NULL,
      title VARCHAR(255) DEFAULT 'Untitled Resume',
      content JSONB,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await queryPg(createTableQuery);
  } catch (err) {
    console.error("[PostgreSQL Resume Schema Notice]:", err.message);
  }
}

// Default initial seed resumes if user has no resumes stored in DB
const DEFAULT_SEED_RESUMES = [
  {
    id: "res_nodejs_default",
    title: "Nodejs - Senior Developer",
    tag: "Node.js",
    date: new Date().toISOString().split("T")[0],
    templateId: "nodejs-modern",
    data: {
      name: "Rahmatullah Baheer",
      roleTitle: "Node.js & MERN Stack Lead",
      avatarUrl: "",
      email: "rahmatullah@careerbuild.io",
      phone: "+1 (555) 987-6543",
      location: "Kabul / Remote",
      summary:
        "Full Stack MERN Developer with experience in building scalable web applications using MongoDB, Express.js, React, Next.js and Node.js. Proficient in both front-end and back-end development, with a strong focus on clean code, performance, and responsive design.",
      skills: ["Node.js", "React", "Next.js", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Tailwind CSS"],
      experiences: [
        {
          id: 1,
          role: "Lead Node.js & Fullstack Architect",
          company: "RB Tech Innovations",
          duration: "2024 - Present",
          description:
            "Architected microservice backend APIs and interactive frontend dashboards. Reduced latency by 45%.",
        },
        {
          id: 2,
          role: "Senior Backend Developer",
          company: "Global Tech Solutions",
          duration: "2022 - 2024",
          description:
            "Engineered high-throughput authentication services, real-time WebSockets, and database migrations.",
        },
      ],
      degree: "B.S. Software Engineering",
      university: "Polytechnic University",
    },
  },
  {
    id: "res_react_default",
    title: "React - UI/UX Specialist",
    tag: "React",
    date: new Date().toISOString().split("T")[0],
    templateId: "creative-dev",
    data: {
      name: "Rahmatullah Baheer",
      roleTitle: "Frontend React Specialist",
      avatarUrl: "",
      email: "rahmatullah@careerbuild.io",
      phone: "+1 (555) 987-6543",
      location: "Remote",
      summary:
        "Frontend Engineer specializing in ultra-responsive React applications, framer-motion animations, component libraries, and web performance.",
      skills: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Framer Motion", "Tailwind CSS", "Jest"],
      experiences: [
        {
          id: 1,
          role: "Senior React Developer",
          company: "Creative UI Studio",
          duration: "2023 - Present",
          description:
            "Crafted modern design system components and optimized web applications for top Lighthouse SEO scores.",
        },
      ],
      degree: "B.S. Software Engineering",
      university: "Polytechnic University",
    },
  },
  {
    id: "res_reactnative_default",
    title: "React Native - Mobile Lead",
    tag: "React Native",
    date: new Date().toISOString().split("T")[0],
    templateId: "executive-pro",
    data: {
      name: "Rahmatullah Baheer",
      roleTitle: "React Native Mobile Lead",
      avatarUrl: "",
      email: "rahmatullah@careerbuild.io",
      phone: "+1 (555) 987-6543",
      location: "Remote",
      summary:
        "Cross-platform Mobile Developer specializing in React Native, iOS & Android native integrations, push notifications, and offline data sync.",
      skills: ["React Native", "Expo", "iOS / Swift", "Android / Kotlin", "GraphQL", "Firebase", "App Store Publishing"],
      experiences: [
        {
          id: 1,
          role: "Lead Mobile Developer",
          company: "AppSphere Technologies",
          duration: "2023 - Present",
          description:
            "Published 5+ mobile apps to Apple App Store & Google Play with over 100k active users.",
        },
      ],
      degree: "B.S. Software Engineering",
      university: "Polytechnic University",
    },
  },
];

/**
 * Fetch all resumes for a specific user ID from PostgreSQL
 */
export async function getUserResumesFromDb(userId) {
  if (!userId) return [];
  await ensureUserRecordExists(userId);
  await ensureResumesTableExists();

  try {
    const res = await queryPg(
      `SELECT id, "userId", title, content, "createdAt", "updatedAt" 
       FROM public.resumes 
       WHERE "userId" = $1 
       ORDER BY "updatedAt" DESC;`,
      [userId]
    );

    // If user has no resumes yet, return empty array (0 resumes by default)
    if (res.rows.length === 0) {
      return [];
    }

    // Map database rows to UI structure
    return res.rows.map((row) => {
      let contentObj = row.content || {};
      if (typeof contentObj === "string") {
        try {
          contentObj = JSON.parse(contentObj);
        } catch (e) {
          contentObj = {};
        }
      }

      return {
        id: row.id,
        title: row.title || contentObj.title || "Untitled Resume",
        tag: contentObj.tag || "Resume",
        date: contentObj.date || new Date(row.updatedAt || Date.now()).toISOString().split("T")[0],
        templateId: contentObj.templateId || "nodejs-modern",
        data: contentObj.data || {},
      };
    });
  } catch (err) {
    console.error("[Native PG Get Resumes Error]:", err.message);
    throw err;
  }
}

/**
 * Save / Create a new resume in PostgreSQL
 */
export async function createResumeInDb(userId, resumeObj) {
  if (!userId || !resumeObj) return null;
  await ensureUserRecordExists(userId);
  await ensureResumesTableExists();

  const id = resumeObj.id ? String(resumeObj.id) : `res_${userId}_${Date.now()}`;
  const title = resumeObj.title || "Untitled Resume";
  const contentObj = {
    tag: resumeObj.tag || "Custom",
    date: resumeObj.date || new Date().toISOString().split("T")[0],
    templateId: resumeObj.templateId || "nodejs-modern",
    data: resumeObj.data || {},
  };

  try {
    const insertQuery = `
      INSERT INTO public.resumes (id, "userId", title, content, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *;
    `;
    const res = await queryPg(insertQuery, [id, userId, title, JSON.stringify(contentObj)]);
    const row = res.rows[0];
    console.log(`[Native PG DB] Created resume ID ${row.id} in DB for user ${userId}`);
    return {
      id: row.id,
      title: row.title,
      tag: row.content?.tag || "Custom",
      date: row.content?.date || new Date().toISOString().split("T")[0],
      templateId: row.content?.templateId || "nodejs-modern",
      data: row.content?.data || {},
    };
  } catch (err) {
    console.error("[Native PG Create Resume Error]:", err.message);
    throw err;
  }
}

/**
 * Update an existing resume in PostgreSQL
 */
export async function updateResumeInDb(userId, resumeId, updatedResumeObj) {
  if (!userId || !resumeId || !updatedResumeObj) return null;
  await ensureUserRecordExists(userId);
  await ensureResumesTableExists();

  const title = updatedResumeObj.title || "Untitled Resume";
  const contentObj = {
    tag: updatedResumeObj.tag || "Resume",
    date: new Date().toISOString().split("T")[0],
    templateId: updatedResumeObj.templateId || "nodejs-modern",
    data: updatedResumeObj.data || {},
  };

  try {
    const updateQuery = `
      UPDATE public.resumes 
      SET title = $1, content = $2, "updatedAt" = NOW()
      WHERE id = $3 AND "userId" = $4
      RETURNING *;
    `;
    const res = await queryPg(updateQuery, [title, JSON.stringify(contentObj), String(resumeId), userId]);

    if (res.rows.length === 0) {
      // If row didn't exist, create it via fallback insert
      return await createResumeInDb(userId, { id: resumeId, ...updatedResumeObj });
    }

    const row = res.rows[0];
    console.log(`[Native PG DB] Updated resume ID ${row.id} in DB for user ${userId}`);
    return {
      id: row.id,
      title: row.title,
      tag: row.content?.tag || "Resume",
      date: row.content?.date || new Date().toISOString().split("T")[0],
      templateId: row.content?.templateId || "nodejs-modern",
      data: row.content?.data || {},
    };
  } catch (err) {
    console.error("[Native PG Update Resume Error]:", err.message);
    throw err;
  }
}

/**
 * Delete a resume from PostgreSQL
 */
export async function deleteResumeFromDb(userId, resumeId) {
  if (!userId || !resumeId) return false;
  await ensureResumesTableExists();

  try {
    const deleteQuery = `
      DELETE FROM public.resumes 
      WHERE id = $1 AND "userId" = $2;
    `;
    const res = await queryPg(deleteQuery, [String(resumeId), userId]);
    console.log(`[Native PG DB] Deleted resume ID ${resumeId} for user ${userId}`);
    return res.rowCount > 0;
  } catch (err) {
    console.error("[Native PG Delete Resume Error]:", err.message);
    throw err;
  }
}
