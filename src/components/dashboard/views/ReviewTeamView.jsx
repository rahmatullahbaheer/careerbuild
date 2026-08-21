"use client";

import React, { useState } from "react";
import { Plus, Users, Mail, Shield, CheckCircle2, Clock } from "lucide-react";

export default function ReviewTeamView() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Alexandra Deff",
      role: "Senior HR Recruiter",
      email: "alexandra@careerbuild.com",
      status: "Active Reviewer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 2,
      name: "Edwin Adenike",
      role: "Technical Lead & Reviewer",
      email: "edwin@careerbuild.com",
      status: "Active Reviewer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 3,
      name: "Isaac Oluwatemilorun",
      role: "ATS Content Strategist",
      email: "isaac@careerbuild.com",
      status: "Pending Invite",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Review Team & Collaborators
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Invite mentors, HR professionals, and colleagues to review your resume.
          </p>
        </div>

        <button
          onClick={() => alert("Invite Reviewer Modal Opened")}
          className="py-2.5 px-4 rounded-full bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Reviewer</span>
        </button>
      </div>

      {/* Reviewers List */}
      <div className="bg-white border border-gray-100/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Active Reviewers ({members.length})</h3>

        <div className="space-y-3">
          {members.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-gray-50/70 border border-gray-200/60"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                  <p className="text-[11px] text-gray-500">{item.role}</p>
                  <p className="text-[10px] text-gray-400">{item.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    item.status.includes("Active")
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {item.status}
                </span>

                <button
                  onClick={() => alert(`Sending message to ${item.name}`)}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
