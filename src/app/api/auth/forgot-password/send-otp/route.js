import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/email";
import { registerUserInDb } from "@/lib/userDb";

// In-memory OTP cache store
global.otpStore = global.otpStore || new Map();

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Ensure email is registered in user store for seamless reset flow
    await registerUserInDb({ email: cleanEmail });

    // Generate 6-digit numeric OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Store in OTP memory store
    global.otpStore.set(cleanEmail, {
      code: otpCode,
      expiresAt,
      verified: false,
    });

    console.log(`[OTP STORE] Key: ${cleanEmail} -> Code: ${otpCode}`);

    // Send email via Resend email helper
    await sendOtpEmail({ email: cleanEmail, otpCode });

    return NextResponse.json({
      success: true,
      message: `A 6-digit OTP code has been sent to ${cleanEmail}. Please check your inbox.`,
      email: cleanEmail,
      demoOtpCode: otpCode,
    });
  } catch (error) {
    console.error("Send OTP API error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP code. Please try again." },
      { status: 500 }
    );
  }
}
