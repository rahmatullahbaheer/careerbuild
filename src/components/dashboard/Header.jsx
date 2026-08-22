"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Bell,
  Sparkles,
  User,
  Settings,
  LogOut,
  FileText,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

import { useUser } from "@/context/UserContext";

export default function Header({
  pageName = "Dashboard",
  user: propUser,
}) {
  const { user: contextUser } = useUser();
  const user = contextUser || propUser || {
    name: "Alexander Wright",
    email: "alex.wright@engineer.io",
    plan: "Pro Plan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="w-full flex items-center justify-between gap-4 py-2 px-1 relative z-30">
      {/* Left: Dynamic Active Page Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {pageName}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60 hidden sm:inline-block">
              Active Session
            </span>
          </div>
        </div>
      </div>

      {/* Right: User Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Message Icon */}
        <button
          onClick={() => alert("Messages clicked")}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
          aria-label="Messages"
        >
          <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Notification Bell Icon */}
        <button
          onClick={() => alert("Notifications clicked")}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-2xs cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* User Profile Avatar with Dropdown */}
        <div
          className="relative pl-2 border-l border-gray-200/80"
          ref={dropdownRef}
        >
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            aria-label="Open user menu"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-zinc-100/80 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {/* Avatar container with non-clipped online badge */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-zinc-200 shadow-xs bg-blue-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user.avatar ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online status dot — outside overflow-hidden so it's not clipped */}
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs"
                title="Online"
              />
            </div>

            {/* Subtle Chevron indicator */}
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-gray-200 shadow-xl p-2 z-50 text-left"
              >
                {/* User Info Header inside Dropdown */}
                <div className="p-3 bg-zinc-50 rounded-xl mb-1.5 border border-zinc-100">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-zinc-200 flex-shrink-0 bg-blue-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          user.avatar ||
                          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                        }
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {user.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Plan Badge */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 text-[10px]">
                    <span className="font-semibold text-zinc-500">
                      Plan Status
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      {user.plan || "Pro Plan"}
                    </span>
                  </div>
                </div>

                {/* Nav Links inside Dropdown */}
                <div className="space-y-0.5 text-xs font-medium text-gray-700">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/dashboard/my-resumes"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>My Resumes</span>
                  </Link>

                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Account Settings</span>
                  </Link>

                  <Link
                    href="/dashboard/help"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span>Help & Support</span>
                  </Link>
                </div>

                {/* Log Out Button */}
                <div className="pt-1.5 mt-1.5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={async () => {
                      setDropdownOpen(false);
                      try {
                        await fetch("/api/auth/logout", { method: "POST" });
                        if (typeof window !== "undefined") {
                          sessionStorage.clear();
                          localStorage.clear();
                        }
                      } catch (e) {}
                      window.location.replace("/login");
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
