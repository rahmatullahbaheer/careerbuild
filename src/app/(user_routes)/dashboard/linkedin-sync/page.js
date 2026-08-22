import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LinkedInView from "@/components/dashboard/views/LinkedInView";

export const metadata = {
  title: "LinkedIn Sync & Optimization - Donezo",
  description: "Sync and optimize your LinkedIn profile with AI",
};

export default function LinkedInSyncPage() {
  return (
    <DashboardLayout>
      <LinkedInView />
    </DashboardLayout>
  );
}
