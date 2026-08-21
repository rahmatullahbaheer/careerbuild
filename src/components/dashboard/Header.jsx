"use client";

import React from "react";
import { Mail, Bell, Sparkles } from "lucide-react";

export default function Header({
  pageName = "Dashboard",
  user = { name: "Totok Michael", email: "tmichael20@gmail.com" },
}) {
  return (
    <header className="w-full flex items-center justify-between gap-4 py-2 px-1">
      {/* Left: Dynamic Active Page Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#064e3b]/10 border border-[#064e3b]/20 flex items-center justify-center text-[#064e3b]">
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
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-2xs"
          aria-label="Messages"
        >
          <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {/* Notification Bell Icon */}
        <button
          onClick={() => alert("Notifications clicked")}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-2xs"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-1.5 border-l border-gray-200/80">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-200 overflow-hidden ring-2 ring-white shadow-2xs flex items-center justify-center font-bold text-amber-800 text-sm">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="hidden sm:block text-left">
            <h3 className="text-xs font-bold text-gray-900 leading-tight">
              {user.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-medium">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
