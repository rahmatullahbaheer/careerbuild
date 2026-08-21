"use client";

import React from "react";
import { Plus, FileText, BookOpen, Sparkles, ShieldCheck, FileCheck } from "lucide-react";

export default function ProjectList() {
  const documents = [
    {
      title: "Senior Fullstack Resume",
      date: "Updated: Nov 25, 2024",
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Tech Lead Cover Letter",
      date: "Updated: Nov 28, 2024",
      icon: BookOpen,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Frontend Architect Resume",
      date: "Updated: Nov 30, 2024",
      icon: Sparkles,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Product Manager Resume",
      date: "Updated: Dec 5, 2024",
      icon: FileCheck,
      color: "text-orange-600 bg-orange-50",
    },
    {
      title: "DevOps Engineer Cover Letter",
      date: "Updated: Dec 6, 2024",
      icon: ShieldCheck,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide">
          Recent Documents
        </h3>
        <button
          onClick={() => alert("Create New Resume or Cover Letter")}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>New</span>
        </button>
      </div>

      {/* Document Items */}
      <div className="space-y-3">
        {documents.map((doc, index) => {
          const Icon = doc.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50/80 transition-all cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.color} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {doc.title}
                </h4>
                <p className="text-[10px] text-gray-400 font-medium">
                  {doc.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
