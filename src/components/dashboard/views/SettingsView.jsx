"use client";

import React, { useState } from "react";
import { User, Bell, Lock, Shield, Save, Check } from "lucide-react";

export default function SettingsView() {
  const [profile, setProfile] = useState({
    name: "Totok Michael",
    email: "tmichael20@gmail.com",
    jobTitle: "Senior Software Engineer",
    portfolio: "https://totokmichael.dev",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Account & Profile Settings
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Manage your account profile details, security preferences, and subscription tier.
        </p>
      </div>

      {/* Main Settings Form Container */}
      <form onSubmit={handleSave} className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-2xs space-y-6">
        {/* Profile Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Target Role Title</label>
              <input
                type="text"
                value={profile.jobTitle}
                onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Portfolio URL</label>
              <input
                type="text"
                value={profile.portfolio}
                onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Subscription Plan Tier */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Active Plan
            </span>
            <h4 className="text-lg font-extrabold">CareerBuild PRO Plan</h4>
            <p className="text-xs text-emerald-100/80">
              Unlimited AI resumes, ATS scans, & PDF exports.
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Subscription Management")}
            className="py-2 px-4 rounded-xl bg-white text-[#064e3b] font-bold text-xs shadow-xs hover:bg-emerald-50 transition-all"
          >
            Manage Plan
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="py-2.5 px-5 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Saved Changes!" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
