import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams, origin } = new URL(req.url);
  const redirect = searchParams.get("redirect") || "/dashboard";

  const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const isValidClientId =
    googleClientId &&
    !googleClientId.includes("your_") &&
    googleClientId.endsWith(".apps.googleusercontent.com");

  // If valid Google Client ID exists, initiate Google OAuth consent screen
  if (isValidClientId) {
    // Dynamic request origin calculation: strictly use localhost origin when running locally
    const requestOrigin = req.nextUrl?.origin || origin || "http://localhost:3000";
    const isLocal = requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1");
    const siteUrl = (isLocal ? requestOrigin : (process.env.NEXT_PUBLIC_SITE_URL || requestOrigin)).replace(/\/$/, "");
    const redirectUri = `${siteUrl}/api/auth/google/callback`;

    console.log(`[Google OAuth Init] Client ID: ${googleClientId.substring(0, 15)}... | Redirect URI: ${redirectUri}`);

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20profile%20email&prompt=select_account`;

    return NextResponse.redirect(googleAuthUrl);
  }

  // Development/Demo Mode Fallback
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
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
