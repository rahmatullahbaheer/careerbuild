"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function TeamCollaboration() {
  const reviewers = [
    {
      name: "Alexandra Deff",
      task: "Reviewing Fullstack Resume ATS Score",
      status: "Completed",
      badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    {
      name: "Edwin Adenike",
      task: "Reviewing Cover Letter Structure",
      status: "In Progress",
      badgeStyle: "bg-amber-50 text-amber-600 border-amber-200/60",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    {
      name: "Isaac Oluwatemilorun",
      task: "Optimizing Resume Keywords for ATS",
      status: "Pending",
      badgeStyle: "bg-rose-50 text-rose-600 border-rose-200/60",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    },
    {
      name: "David Oshodi",
      task: "Feedback on Technical Skills Section",
      status: "In Progress",
      badgeStyle: "bg-amber-50 text-amber-600 border-amber-200/60",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    },
  ];

  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide">
          Resume Reviewers
        </h3>
        <button
          onClick={() => alert("Add Reviewer")}
          className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Reviewer</span>
        </button>
      </div>

      {/* Reviewer List */}
      <div className="space-y-3.5">
        {reviewers.map((reviewer, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-gray-50/70 transition-all"
          >
            {/* Avatar & Info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={reviewer.avatar}
                alt={reviewer.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {reviewer.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium truncate">
                  {reviewer.task}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${reviewer.badgeStyle} flex-shrink-0`}
            >
              {reviewer.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
