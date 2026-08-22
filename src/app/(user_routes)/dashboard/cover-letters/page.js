import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CoverLettersView from "@/components/dashboard/views/CoverLettersView";

export const metadata = {
  title: "Cover Letters - Donezo",
  description: "Create and manage professional cover letters",
};

export default function CoverLettersPage() {
  return (
    <DashboardLayout>
      <CoverLettersView />
    </DashboardLayout>
  );
}
