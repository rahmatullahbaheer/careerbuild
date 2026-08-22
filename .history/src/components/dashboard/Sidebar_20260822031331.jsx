"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Sparkles,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Smartphone,
  Menu,
  X,
} from "lucide-react";
import Linkedin from "../icons/LinkedinIcon";

export default function Sidebar({ activeTab = "Dashboard", onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
    { name: "My Resumes", href: "/dashboard/my-resumes", icon: FileText, badge: "12+" },
    { name: "Cover Letters", href: "/dashboard/cover-letters", icon: BookOpen, badge: null },
    { name: "Templates", href: "/dashboard/templates", icon: Sparkles, badge: null },
    { name: "ATS Analytics", href: "/dashboard/ats-analytics", icon: BarChart3, badge: null },
    { name: "LinkedIn Sync", href: "/dashboard/linkedin-sync", icon: Linkedin, badge: "AI" },
    { name: "Review Team", href: "/dashboard/review-team", icon: Users, badge: null },
  ];

  const generalItems = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Help", href: "/dashboard/help", icon: HelpCircle },
    { name: "Logout", href: "/login", icon: LogOut },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#064e3b] text-white shadow-md"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full  w-[250px] bg-green-100 border-r border-gray-100 flex flex-col justify-between p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-7">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-[#064e3b] flex items-center justify-center text-white shadow-sm">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-neutral-900 tracking-tight">
              Donezo
            </span>
          </div>

          {/* MENU Section */}
          <div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name || pathname === item.href || (item.href === "/dashboard" && pathname === "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      if (onTabChange) onTabChange(item.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex cursor-pointer items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#064e3b] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? "bg-[#0f766e] text-white"
                            : "bg-[#064e3b] text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* GENERAL Section */}
          <div>
            <p className="px-3 text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-3">
              GENERAL
            </p>
            <nav className="space-y-1">
              {generalItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name || pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      if (onTabChange) onTabChange(item.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex cursor-pointer items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#064e3b] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Promo Mobile App Download Card */}
        <div className="relative mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white overflow-hidden shadow-md">
          <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M0 50 Q 25 20, 50 50 T 100 50" stroke="white" strokeWidth="6" />
              <path d="M0 70 Q 25 40, 50 70 T 100 70" stroke="white" strokeWidth="6" />
            </svg>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wide">
                Download Mobile App
              </h4>
              <p className="text-[10px] text-emerald-200/80 mt-0.5">
                Build & edit resumes on the go
              </p>
            </div>
            <button className="w-full py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-xs">
              Download
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
