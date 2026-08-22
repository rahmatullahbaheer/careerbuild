"use client";

import React, { useState, useEffect } from "react";
import { User, Shield, Save, Check, Eye, EyeOff, KeyRound } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function SettingsView() {
  const { user, updateProfile } = useUser();

  const [profile, setProfile] = useState({
    name: user?.name || "Alexander Wright",
    email: user?.email || "alex.wright@engineer.io",
    jobTitle: user?.jobTitle || "Senior Software Engineer",
    portfolio: user?.portfolio || "https://alexanderwright.dev",
  });

  // Keep local state in sync when user context loads
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        jobTitle: user.jobTitle || "",
        portfolio: user.portfolio || "",
      });
    }
  }, [user]);

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSaved(false);
    setProfileLoading(true);

    try {
      const result = await updateProfile(profile);
      if (result.success) {
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
      } else {
        setProfileError(result.error || "Failed to update profile details.");
      }
    } catch (err) {
      setProfileError("An error occurred while saving profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update password.");

      setPasswordSuccess(data.message || "Password updated successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err.message || "An error occurred.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Account & Security Settings
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Manage your personal details, change account password, and check subscription tier.
        </p>
      </div>

      {/* Main Grid: Profile Info & Change Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Form */}
        <form onSubmit={handleProfileSave} className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>Personal Details</span>
            </h3>

            {profileError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                {profileError}
              </div>
            )}

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Profile updated everywhere successfully!</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Alexander Wright"
                  className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="e.g. alex.wright@engineer.io"
                  className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Target Role Title</label>
                <input
                  type="text"
                  value={profile.jobTitle}
                  onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Portfolio URL</label>
                <input
                  type="text"
                  value={profile.portfolio}
                  onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.dev"
                  className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={profileLoading}
              className="py-2 px-4 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {profileLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : profileSaved ? (
                <Check className="w-4 h-4 text-emerald-300" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{profileLoading ? "Saving..." : profileSaved ? "Saved Changes!" : "Save Profile"}</span>
            </button>
          </div>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-2xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <span>Change Password</span>
            </h3>

            {/* Error & Success Messages */}
            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Current Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    required
                    placeholder="••••••••••••"
                    className="w-full h-10 px-3 pr-10 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    required
                    placeholder="••••••••••••"
                    className="w-full h-10 px-3 pr-10 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    required
                    placeholder="••••••••••••"
                    className="w-full h-10 px-3 pr-10 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={passwordLoading}
              className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {passwordLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Shield className="w-4 h-4" />
              )}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Active Subscription Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            Active Plan
          </span>
          <h4 className="text-lg font-extrabold">{user?.plan || "CareerBuild PRO Plan"}</h4>
          <p className="text-xs text-emerald-100/80">
            Unlimited AI resumes, ATS scans, & PDF exports.
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("Subscription Management")}
          className="py-2 px-4 rounded-xl bg-white text-[#064e3b] font-bold text-xs shadow-xs hover:bg-emerald-50 transition-all cursor-pointer"
        >
          Manage Plan
        </button>
      </div>
    </div>
  );
}
