import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/userDb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Invalid password. Passwords must be at least 6 characters long." },
        { status: 401 }
      );
    }

    // Verify user exists in database
    const existingUser = await findUserByEmail(cleanEmail);
    if (!existingUser) {
      return NextResponse.json(
        { error: "No account found with this email address. Please sign up first." },
        { status: 404 }
      );
    }

    const user = {
      id: existingUser.id || "usr_active_session",
      name: existingUser.name || cleanEmail.split("@")[0],
      email: cleanEmail,
      jobTitle: existingUser.jobTitle || "Software Professional",
      portfolio: existingUser.portfolio || "",
      plan: existingUser.plan || "PRO Plan",
      avatar: existingUser.avatar || "",
    };

    global.userProfileStore = user;

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully!",
      user,
    });

    // Set secure auth cookies
    response.cookies.set("careerbuild_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("careerbuild_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
