import { NextResponse } from "next/server";

export async function GET(req) {
  const authCookie = req.cookies.get("careerbuild_auth");
  const isAuthenticated = !!(authCookie && authCookie.value === "true");

  if (!isAuthenticated || !global.userProfileStore) {
    return NextResponse.json({ authenticated: false, user: null });
  }

  return NextResponse.json({
    authenticated: true,
    user: global.userProfileStore,
  });
}
