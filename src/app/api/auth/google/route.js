import { NextResponse } from "next/server";

const DEFAULT_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "766525114472" + "-5146sc9bpm6rf461ut5qtfjj7ouvqla1.apps.googleusercontent.com";

function getRedirectUri(req) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const requestOrigin = req.nextUrl?.origin || "";
  const isLocal =
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    requestOrigin.includes("localhost") ||
    requestOrigin.includes("127.0.0.1");

  if (isLocal) {
    const localBase = requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1")
      ? requestOrigin
      : "http://localhost:3000";
    return `${localBase.replace(/\/$/, "")}/api/auth/google/callback`;
  }

  // Production Canonical Redirect URI (Matches Google Console JSON exactly!)
  const prodBase = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.vercel.app").replace(/\/$/, "");
  return `${prodBase}/api/auth/google/callback`;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get("redirect") || "/dashboard";

  const googleClientId = DEFAULT_CLIENT_ID.trim();
  const isValidClientId =
    googleClientId &&
    !googleClientId.includes("your_") &&
    googleClientId.endsWith(".apps.googleusercontent.com");

  // If valid Google Client ID exists, initiate Google OAuth consent screen
  if (isValidClientId) {
    const redirectUri = getRedirectUri(req);

    console.log(`[Google OAuth Init] Client ID: ${googleClientId.substring(0, 15)}... | Redirect URI: ${redirectUri}`);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20profile%20email&prompt=select_account`;

    return NextResponse.redirect(googleAuthUrl);
  }

  // Development/Demo Mode Fallback if Client ID is missing
  global.userProfileStore = {
    name: "Baheer",
    email: "alex.google@gmail.com",
    jobTitle: "Senior Software Engineer",
    portfolio: "https://alexgoogle.dev",
    plan: "CareerBuild PRO Plan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  };

  const response = NextResponse.redirect(new URL(redirect, req.url));
  response.cookies.set("careerbuild_auth", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
