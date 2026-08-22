import { NextResponse } from "next/server";
import { findUserByEmail, registerUserInDb } from "@/lib/userDb";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists in DB
    const existingUser = await findUserByEmail(cleanEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in instead." },
        { status: 409 }
      );
    }

    // Save user in shared database
    const newUser = await registerUserInDb({
      name: name || cleanEmail.split("@")[0],
      email: cleanEmail,
      plan: "FREE",
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to CareerBuild.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        plan: newUser.plan,
      },
    });
  } catch (error) {
    console.error("Sign up API error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}
