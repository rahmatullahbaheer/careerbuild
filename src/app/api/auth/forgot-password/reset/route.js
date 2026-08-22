import { NextResponse } from "next/server";
import { registerUserInDb } from "@/lib/userDb";

global.otpStore = global.otpStore || new Map();

export async function POST(req) {
  try {
    const { email, otpCode, newPassword } = await req.json();

    if (!email || !otpCode || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP code, and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const storedRecord = global.otpStore.get(cleanEmail);

    if (!storedRecord) {
      return NextResponse.json(
        { error: "No OTP request found for this email. Please request a new code." },
        { status: 404 }
      );
    }

    // Check expiration
    if (Date.now() > storedRecord.expiresAt) {
      global.otpStore.delete(cleanEmail);
      return NextResponse.json(
        { error: "OTP code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    // Verify OTP code matching
    if (storedRecord.code !== otpCode.toString().trim()) {
      return NextResponse.json(
        { error: "Invalid OTP code. Please double check the 6-digit code sent to your email." },
        { status: 400 }
      );
    }

    // OTP Verified! Register/update user password in database
    await registerUserInDb({
      email: cleanEmail,
      password: newPassword,
    });

    // Clear memory record
    global.otpStore.delete(cleanEmail);

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset Password API error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
