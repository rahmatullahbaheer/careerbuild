import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Expire auth cookie
  response.cookies.set("careerbuild_auth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  return response;
}

export async function GET(req) {
  const response = NextResponse.redirect(new URL("/login", req.url));
  response.cookies.set("careerbuild_auth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
}
