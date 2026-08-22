import { NextResponse } from "next/server";
import { registerUserInDb } from "@/lib/userDb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const host = request.headers.get("host") || "careerbuild.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";

  if (error || !code) {
    console.error("[Google OAuth Callback Error]:", error || "No code received");
    return NextResponse.redirect(new URL("/login?error=Google login failed", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("[Google OAuth Error]: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variables.");
    return NextResponse.redirect(new URL("/login?error=Server configuration error", request.url));
  }
  
  let redirectUri = process.env.GOOGLE_REDIRECT_URI || "https://careerbuild.vercel.app/api/auth/google/callback";
  if (host.includes("localhost")) {
    redirectUri = `${protocol}://${host}/api/auth/google/callback`;
  }

  try {
    // 1. Exchange authorization code for Google access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("[Google Token Exchange Error]:", tokenData);
      
      // Retry with production redirect URI if local host mismatch occurred
      if (redirectUri !== "https://careerbuild.vercel.app/api/auth/google/callback") {
        const retryTokenResp = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: "https://careerbuild.vercel.app/api/auth/google/callback",
            grant_type: "authorization_code",
          }),
        });
        const retryData = await retryTokenResp.json();
        if (retryTokenResp.ok && retryData.access_token) {
          tokenData.access_token = retryData.access_token;
        } else {
          return NextResponse.redirect(new URL("/login?error=Failed to retrieve access token from Google", request.url));
        }
      } else {
        return NextResponse.redirect(new URL("/login?error=Failed to retrieve access token from Google", request.url));
      }
    }

    // 2. Fetch User Info from Google
    const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const googleUser = await userinfoResponse.json();

    if (!googleUser || !googleUser.email) {
      return NextResponse.redirect(new URL("/login?error=Could not get user details from Google", request.url));
    }

    // 3. Save or update user profile in PostgreSQL database
    const dbUser = await registerUserInDb({
      id: `usr_${googleUser.id || Math.random().toString(36).substring(2, 10)}`,
      name: googleUser.name || googleUser.given_name || googleUser.email.split("@")[0],
      email: googleUser.email,
      image: googleUser.picture || "",
      jobTitle: "Software Professional",
      portfolio: "",
      plan: "CareerBuild PRO Plan",
    });

    const activeUser = {
      id: dbUser?.id || `usr_${googleUser.id}`,
      name: googleUser.name || googleUser.email.split("@")[0],
      email: googleUser.email.toLowerCase().trim(),
      jobTitle: dbUser?.jobTitle || "Software Professional",
      portfolio: dbUser?.portfolio || "",
      plan: dbUser?.plan || "CareerBuild PRO Plan",
      avatar: googleUser.picture || dbUser?.image || "",
    };

    // Store in memory profile store
    global.userProfileStore = activeUser;

    // 4. Create Response with Auth Cookie and redirect to Dashboard
    const redirectTargetUrl = new URL("/dashboard", request.url);
    const response = NextResponse.redirect(redirectTargetUrl);

    response.cookies.set("careerbuild_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("[Google OAuth Callback Exception]:", err);
    return NextResponse.redirect(new URL("/login?error=Authentication error", request.url));
  }
}
