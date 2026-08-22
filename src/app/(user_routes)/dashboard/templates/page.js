import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TemplatesView from "@/components/dashboard/views/TemplatesView";

export const metadata = {
  title: "Templates Library - Donezo",
  description: "Explore ATS-friendly resume templates",
};

export default function TemplatesPage() {
  return (
    <DashboardLayout>
      <TemplatesView />
    </DashboardLayout>
  );
}
