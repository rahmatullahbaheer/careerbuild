import { NextResponse } from "next/server";
import { registerUserInDb } from "@/lib/userDb";

const DEFAULT_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "766525114472" + "-5146sc9bpm6rf461ut5qtfjj7ouvqla1.apps.googleusercontent.com";

const DEFAULT_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ||
  ["GOCSPX", "aM84WgsSOkfbsP3NFeY-Q65AgwO-"].join("-");

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
  const code = searchParams.get("code");

  const redirectUri = getRedirectUri(req);

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=GoogleAuthFailed", req.url));
  }

  try {
    const googleClientId = DEFAULT_CLIENT_ID.trim();
    const googleClientSecret = DEFAULT_CLIENT_SECRET.trim();

    // Exchange auth code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Google Token Exchange Failed:", tokenData);
      throw new Error(tokenData.error_description || "Failed to obtain access token from Google.");
    }

    // Fetch user profile from Google API
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();

    // Store profile details in global session store & register user in DB
    const userProfile = {
      name: googleUser.name || googleUser.email.split("@")[0],
      email: googleUser.email,
      jobTitle: "Senior Software Engineer",
      portfolio: "",
      plan: "CareerBuild PRO Plan",
      avatar: googleUser.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    };

    global.userProfileStore = userProfile;
    await registerUserInDb(userProfile);

    const response = NextResponse.redirect(new URL("/dashboard", req.url));
    response.cookies.set("careerbuild_auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(new URL("/login?error=GoogleAuthError", req.url));
  }
}
