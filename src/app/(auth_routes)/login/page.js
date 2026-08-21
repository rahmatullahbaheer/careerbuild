import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In - CareerBuild",
  description: "Sign in to your CareerBuild account",
};

export default function LoginPage() {
  return <AuthForm initialMode="signin" />;
}
