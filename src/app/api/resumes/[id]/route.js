import { NextResponse } from "next/server";
import { updateResumeInDb, deleteResumeFromDb } from "@/lib/resumeDb";

function getUserIdFromRequest(req) {
  const userCookie = req.cookies.get("careerbuild_user_id")?.value;
  if (userCookie) return userCookie;

  if (global.userProfileStore && global.userProfileStore.id) {
    return global.userProfileStore.id;
  }

  return "usr_default_baheer";
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const userId = getUserIdFromRequest(req);
    const body = await req.json();

    if (!id || !body) {
      return NextResponse.json({ error: "Resume ID and payload required" }, { status: 400 });
    }

    const updated = await updateResumeInDb(userId, id, body);
    return NextResponse.json({ success: true, resume: updated });
  } catch (error) {
    console.error("PUT /api/resumes/[id] Error:", error);
    return NextResponse.json({ error: "Failed to update resume in DB" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const userId = getUserIdFromRequest(req);

    if (!id) {
      return NextResponse.json({ error: "Resume ID is required" }, { status: 400 });
    }

    const success = await deleteResumeFromDb(userId, id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("DELETE /api/resumes/[id] Error:", error);
    return NextResponse.json({ error: "Failed to delete resume from DB" }, { status: 500 });
  }
}
