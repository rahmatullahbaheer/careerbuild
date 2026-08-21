import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign Up - CareerBuild",
  description: "Create an account on CareerBuild",
};

export default function SignUpPage() {
  return <AuthForm initialMode="signup" />;
}
