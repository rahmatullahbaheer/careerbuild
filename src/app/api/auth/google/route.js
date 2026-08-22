import { NextResponse } from "next/server";

export async function GET(request) {
  const clientId = (process.env.GOOGLE_CLIENT_ID || "").trim();

  if (!clientId) {
    console.error("[Google OAuth Error]: GOOGLE_CLIENT_ID is not set in environment variables.");
    return NextResponse.redirect(
      new URL("/login?error=Google Client ID is missing in environment variables. Please add GOOGLE_CLIENT_ID in Vercel environment variables.", request.url)
    );
  }
  
  // Get host from request to construct redirect URI
  const host = request.headers.get("host") || "careerbuild.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";

  // Use configured redirect URI or fallback dynamically based on current environment
  let redirectUri = (process.env.GOOGLE_REDIRECT_URI || "").trim() || "https://careerbuild.vercel.app/api/auth/google/callback";
  
  if (host.includes("localhost")) {
    redirectUri = `${protocol}://${host}/api/auth/google/callback`;
  }

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("access_type", "offline");
  googleAuthUrl.searchParams.set("prompt", "select_account");

  return NextResponse.redirect(googleAuthUrl.toString());
}
