"use client";

import React from "react";
import { motion } from "framer-motion";
import StatCard from "../StatCard";
import TemplatesSwiper from "../TemplatesSwiper";
import RecentResumesGrid from "../RecentResumesGrid";
import ProjectAnalytics from "../ProjectAnalytics";
import RemindersCard from "../RemindersCard";
import TeamCollaboration from "../TeamCollaboration";
import ProjectProgress from "../ProjectProgress";
import TimeTracker from "../TimeTracker";
import { Plus } from "lucide-react";

import { useUser } from "@/context/UserContext";

export default function DashboardView() {
  const { user } = useUser();

  return (
    <div className="space-y-5">
      {/* Hero Action Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.name || "Alexander"} 👋
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Build, optimize, and manage your resumes, cover letters & LinkedIn profile.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert("Create New Resume")}
            className="py-2 px-3.5 rounded-full bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Resume</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert("Import Data")}
            className="py-2 px-3.5 rounded-full bg-white border border-[#064e3b] text-[#064e3b] hover:bg-emerald-50/50 font-semibold text-xs sm:text-sm transition-all shadow-2xs"
          >
            Import Data
          </motion.button>
        </div>
      </motion.div>

      {/* 4 Stat Cards with Animated Floating Bubbles, Descriptions & Launch/Soon Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          index={0}
          title="Resume Builder"
          description="AI-powered resume creation with real-time ATS keyword matching."
          count="24 Resumes"
          subtitle="Total Active Documents"
          badgeText="5+ New"
          status="launch"
          gradient="from-[#064e3b] via-[#04392b] to-[#022c22]"
          shadowColor="shadow-emerald-950/20"
          onLaunch={() => alert("Launching Resume Builder...")}
          details={{
            description: "Detailed performance breakdown of your active resumes.",
            items: [
              "24 Total Resumes Created",
              "95% Average ATS Score",
              "Export ready PDF & DOCX formats",
            ],
          }}
        />

        <StatCard
          index={1}
          title="Cover Letter"
          description="Generate tailored cover pages matched for top company applications."
          count="10 Letters"
          subtitle="Cover Pages Created"
          badgeText="2+ New"
          status="launch"
          gradient="from-teal-600 via-emerald-600 to-cyan-700"
          shadowColor="shadow-teal-900/20"
          onLaunch={() => alert("Launching Cover Letter Generator...")}
          details={{
            description: "Cover letter optimization and application response statistics.",
            items: [
              "10 Tailored Cover Letters",
              "Matched for Tech & Product roles",
              "High Recruiter Response Rate",
            ],
          }}
        />

        <StatCard
          index={2}
          title="ATS Analytics"
          description="Audit your resume formatting & keywords against Workday & Greenhouse."
          count="92% Pass Rate"
          subtitle="Overall Score"
          badgeText="Optimized"
          status="launch"
          gradient="from-indigo-600 via-purple-600 to-violet-700"
          shadowColor="shadow-indigo-900/20"
          onLaunch={() => alert("Launching ATS Scanner...")}
          details={{
            description: "Applicant Tracking System keyword matching score.",
            items: [
              "92% ATS Keyword Match Rate",
              "Zero Parsing Formatting Errors",
              "Optimized for Workday & Greenhouse",
            ],
          }}
        />

        <StatCard
          index={3}
          title="LinkedIn Sync"
          description="Automatically align your resume keywords with your LinkedIn profile."
          count="94% Score"
          subtitle="Profile Alignment"
          badgeText="Active"
          status="launch"
          gradient="from-blue-600 via-sky-600 to-cyan-600"
          shadowColor="shadow-blue-900/20"
          onLaunch={() => alert("Navigate to LinkedIn Sync menu on the sidebar to view full Optimizer & AI tools!")}
          details={{
            description: "Direct LinkedIn profile optimization & sync platform.",
            items: [
              "Direct LinkedIn Profile Import",
              "+42% Increased Recruiter Views",
              "AI Headline & About Generator",
            ],
          }}
        />
      </div>

      {/* Swiper Templates Carousel */}
      <TemplatesSwiper />

      {/* Recent Resumes Grid */}
      <RecentResumesGrid />

      

      {/* Progress & Time Tracker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
        <TimeTracker />
      </div>
    </div>
  );
}
