import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ATSAnalyticsView from "@/components/dashboard/views/ATSAnalyticsView";

export const metadata = {
  title: "ATS Analytics - Donezo",
  description: "Analyze and optimize your resume for ATS screening",
};

export default function ATSAnalyticsPage() {
  return (
    <DashboardLayout>
      <ATSAnalyticsView />
    </DashboardLayout>
  );
}
