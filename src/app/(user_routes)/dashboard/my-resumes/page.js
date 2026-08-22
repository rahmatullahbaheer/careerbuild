import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MyResumesView from "@/components/dashboard/views/MyResumesView";

export const metadata = {
  title: "My Resumes - Donezo",
  description: "Manage and edit your resumes",
};

export default function MyResumesPage() {
  return (
    <DashboardLayout>
      <MyResumesView />
    </DashboardLayout>
  );
}
