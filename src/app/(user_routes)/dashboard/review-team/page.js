import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReviewTeamView from "@/components/dashboard/views/ReviewTeamView";

export const metadata = {
  title: "Review Team - Donezo",
  description: "Collaborate with experts and peers to review your resume",
};

export default function ReviewTeamPage() {
  return (
    <DashboardLayout>
      <ReviewTeamView />
    </DashboardLayout>
  );
}
