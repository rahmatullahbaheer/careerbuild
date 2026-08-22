"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Import Menu Views
import DashboardView from "./views/DashboardView";
import MyResumesView from "./views/MyResumesView";
import CoverLettersView from "./views/CoverLettersView";
import TemplatesView from "./views/TemplatesView";
import ATSAnalyticsView from "./views/ATSAnalyticsView";
import LinkedInView from "./views/LinkedInView";
import ReviewTeamView from "./views/ReviewTeamView";
import SettingsView from "./views/SettingsView";
import HelpView from "./views/HelpView";

const routeToTabMap = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/dashboard/my-resumes": "My Resumes",
  "/dashboard/cover-letters": "Cover Letters",
  "/dashboard/templates": "Templates",
  "/dashboard/ats-analytics": "ATS Analytics",
  "/dashboard/linkedin-sync": "LinkedIn Sync",
  "/dashboard/linkedin": "LinkedIn Sync",
  "/dashboard/review-team": "Review Team",
  "/dashboard/settings": "Settings",
  "/dashboard/help": "Help",
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const matchedTab = routeToTabMap[pathname] || "Dashboard";
  const [activeTab, setActiveTab] = useState(matchedTab);

  const effectiveTab = routeToTabMap[pathname] || activeTab;

  // Dynamic View Resolver
  const renderActiveView = () => {
    if (children) return children;

    switch (effectiveTab) {
      case "Dashboard":
        return <DashboardView />;
      case "My Resumes":
        return <MyResumesView />;
      case "Cover Letters":
        return <CoverLettersView />;
      case "Templates":
        return <TemplatesView />;
      case "ATS Analytics":
        return <ATSAnalyticsView />;
      case "LinkedIn Sync":
      case "LinkedIn":
        return <LinkedInView />;
      case "Review Team":
        return <ReviewTeamView />;
      case "Settings":
        return <SettingsView />;
      case "Help":
        return <HelpView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb]/60 flex items-center justify-center font-sans antialiased text-gray-900">
      {/* Outer Layout Shell */}
      <div className="w-full max-w-[1440px] bg-[#f8f9fa] flex overflow-hidden min-h-screen">
        {/* Left Sidebar */}
        <Sidebar activeTab={effectiveTab} onTabChange={setActiveTab} />

        {/* Main Content View */}
        <main className="flex-1 flex flex-col min-w-0 p-3 sm:p-5 lg:p-6 space-y-5 overflow-y-auto bg-[#f8f9fa]">
          {/* Header Bar synced with Page Name */}
          <Header pageName={effectiveTab} />

          {/* Active Dedicated Page Content */}
          <div className="flex-1 transition-all duration-200">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}
