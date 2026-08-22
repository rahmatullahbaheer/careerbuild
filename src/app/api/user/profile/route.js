import { NextResponse } from "next/server";

export async function GET(req) {
  const profile = global.userProfileStore || {
    name: "",
    email: "",
    jobTitle: "",
    portfolio: "",
    plan: "FREE",
    avatar: "",
  };

  return NextResponse.json({
    success: true,
    user: profile,
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, jobTitle, portfolio } = body;

    if (!global.userProfileStore) {
      global.userProfileStore = {
        name: "",
        email: "",
        jobTitle: "",
        portfolio: "",
        plan: "FREE",
        avatar: "",
      };
    }

    if (name !== undefined) global.userProfileStore.name = name.trim();
    if (email !== undefined) global.userProfileStore.email = email.trim();
    if (jobTitle !== undefined) global.userProfileStore.jobTitle = jobTitle.trim();
    if (portfolio !== undefined) global.userProfileStore.portfolio = portfolio.trim();

    return NextResponse.json({
      success: true,
      message: "Profile settings updated successfully!",
      user: global.userProfileStore,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to save profile changes." },
      { status: 500 }
    );
  }
}
