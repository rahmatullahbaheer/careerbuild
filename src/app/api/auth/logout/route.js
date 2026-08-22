import { NextResponse } from "next/server";

export async function POST(req) {
  // Clear server-side profile memory
  global.userProfileStore = null;

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Expire & Delete Auth Cookie across all paths
  response.cookies.set("careerbuild_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  response.cookies.delete("careerbuild_auth");

  // Headers to wipe browser cache, session & local storage
  response.headers.set("Clear-Site-Data", '"cache", "cookies", "storage"');
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export async function GET(req) {
  global.userProfileStore = null;

  const response = NextResponse.redirect(new URL("/login", req.url));
  
  response.cookies.set("careerbuild_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  });
  response.cookies.delete("careerbuild_auth");

  response.headers.set("Clear-Site-Data", '"cache", "cookies", "storage"');
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
