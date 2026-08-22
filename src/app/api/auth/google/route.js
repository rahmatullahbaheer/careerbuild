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
    // Dynamically calculate siteUrl for both local development and Vercel production
    const hostOrigin = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : origin;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || hostOrigin || "http://localhost:3000").replace(/\/$/, "");
    const redirectUri = `${siteUrl}/api/auth/google/callback`;
    
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
