import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsView from "@/components/dashboard/views/SettingsView";

export const metadata = {
  title: "Settings - Donezo",
  description: "Manage your account preferences and settings",
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsView />
    </DashboardLayout>
  );
}
