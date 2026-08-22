import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HelpView from "@/components/dashboard/views/HelpView";

export const metadata = {
  title: "Help & Support - Donezo",
  description: "Find answers and support for using Donezo Resume Builder",
};

export default function HelpPage() {
  return (
    <DashboardLayout>
      <HelpView />
    </DashboardLayout>
  );
}
