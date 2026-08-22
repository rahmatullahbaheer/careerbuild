import AuthForm from "@/components/AuthForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.app";

export const metadata = {
  title: "Create Free Account | Build Your ATS Resume in Minutes | CareerBuild",
  description:
    "Sign up free for CareerBuild. Choose from 100+ recruiter-approved resume templates, use AI-powered writing assistance, and download your CV in minutes.",
  keywords: [
    "sign up resume builder",
    "free resume maker account",
    "create ATS CV account",
    "CareerBuild signup",
  ],
  alternates: {
    canonical: `${SITE_URL}/signup`,
  },
  openGraph: {
    title: "Create Your Free CareerBuild Account | AI Resume Maker",
    description: "Start building your job-winning resume for free. 100+ modern templates.",
    url: `${SITE_URL}/signup`,
    siteName: "CareerBuild",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignUpPage() {
  return <AuthForm initialMode="signup" />;
}
