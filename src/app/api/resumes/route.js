import { NextResponse } from "next/server";
import { getUserResumesFromDb, createResumeInDb } from "@/lib/resumeDb";

function getUserIdFromRequest(req) {
  const userCookie = req.cookies.get("careerbuild_user_id")?.value;
  if (userCookie) return userCookie;

  if (global.userProfileStore && global.userProfileStore.id) {
    return global.userProfileStore.id;
  }

  return "usr_default_baheer";
}

export async function GET(req) {
  try {
    const userId = getUserIdFromRequest(req);
    const resumes = await getUserResumesFromDb(userId);
    return NextResponse.json({ success: true, resumes });
  } catch (error) {
    console.error("GET /api/resumes Error:", error);
    return NextResponse.json({ error: "Failed to fetch resumes from DB" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userId = getUserIdFromRequest(req);
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ error: "Invalid resume data payload" }, { status: 400 });
    }

    const createdResume = await createResumeInDb(userId, body);
    return NextResponse.json({ success: true, resume: createdResume });
  } catch (error) {
    console.error("POST /api/resumes Error:", error);
    return NextResponse.json({ error: "Failed to create resume in DB" }, { status: 500 });
  }
}
