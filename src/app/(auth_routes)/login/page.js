import AuthForm from "@/components/AuthForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.vercel.app";

export const metadata = {
  title: "Log In to Your Account | CareerBuild Resume Builder",
  description:
    "Sign in to your CareerBuild account to edit, customize, download, and manage your ATS-friendly professional resumes and cover letters.",
  alternates: {
    canonical: `${SITE_URL}/login`,
  },
  openGraph: {
    title: "Log In | CareerBuild Resume Builder",
    description: "Access your saved resumes and continue building your career.",
    url: `${SITE_URL}/login`,
    siteName: "CareerBuild",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return <AuthForm initialMode="signin" />;
}
