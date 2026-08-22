"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
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
  ArrowRight,
  Download,
  Star,
  CheckCircle2,
} from "lucide-react";
import Linkedin from "../icons/LinkedinIcon";

export default function Sidebar({ activeTab = "Dashboard", onTabChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "My Resumes",
      href: "/dashboard/my-resumes",
      icon: FileText,
      badge: "12+",
    },
    {
      name: "Cover Letters",
      href: "/dashboard/cover-letters",
      icon: BookOpen,
      badge: null,
    },
    {
      name: "Templates",
      href: "/dashboard/templates",
      icon: Sparkles,
      badge: null,
    },
    {
      name: "ATS Analytics",
      href: "/dashboard/ats-analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      name: "LinkedIn Sync",
      href: "/dashboard/linkedin-sync",
      icon: Linkedin,
      badge: "AI",
    },
    {
      name: "Review Team",
      href: "/dashboard/review-team",
      icon: Users,
      badge: null,
    },
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
        className={`fixed lg:static top-0 left-0 z-40   w-[250px] bg-green-100 border-r border-gray-100 flex flex-col justify-between p-6 transition-transform duration-300 ${
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
                const isActive =
                  activeTab === item.name ||
                  pathname === item.href ||
                  (item.href === "/dashboard" && pathname === "/");
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
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`}
                      />
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
                const isActive =
                  activeTab === item.name || pathname === item.href;
                const isLogout = item.name === "Logout";

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={async (e) => {
                      if (isLogout) {
                        e.preventDefault();
                        try {
                          await fetch("/api/auth/logout", { method: "POST" });
                          if (typeof window !== "undefined") {
                            sessionStorage.clear();
                            localStorage.clear();
                          }
                        } catch (err) {}
                        window.location.replace("/login");
                        return;
                      }
                      if (onTabChange) onTabChange(item.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex cursor-pointer items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#064e3b] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400"}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Promo Mobile App Download Card */}
          <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    y: -3,
                    scale: 1.01,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }
            }
            className="group relative mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden shadow-lg border border-white/10"
          >
            {/* Ambient Animated Glow Orb */}
            <div
              className="absolute -top-10 -right-10 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-400/30 transition-all duration-300"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Background Geometric Line Art */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="relative z-10 space-y-3">
              {/* Header: Animated Phone & Rating Tag */}
              <div className="flex items-center justify-between">
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center backdrop-blur-md shadow-xs text-blue-300 group-hover:scale-105 transition-transform"
                >
                  <Smartphone className="w-4 h-4 text-blue-300" />
                </motion.div>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-blue-200">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  4.9
                </span>
              </div>

              {/* Title & Copy */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white tracking-tight">
                    CareerBuild Mobile
                  </h4>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs"
                    title="Live Sync Active"
                  />
                </div>
                <p className="text-[10.5px] text-zinc-300/85 mt-0.5 leading-snug">
                  Edit, review & sync resumes seamlessly on iOS & Android.
                </p>
              </div>

              {/* Interactive Download Action */}
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 group/btn cursor-pointer"
              >
                <span>Get Mobile App</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </aside>
    </>
  );
}
