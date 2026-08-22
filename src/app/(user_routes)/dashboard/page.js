import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardView from "@/components/dashboard/views/DashboardView";

export const metadata = {
  title: "Dashboard - Donezo",
  description: "User task and project management dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardView />
    </DashboardLayout>
  );
}
