"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  FileText,
  Settings,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Fetch session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setAuthUser(data.user);
        } else {
          setAuthUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthUser(null);
    window.location.href = "/";
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.25, ease: "easeOut" },
    }),
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          aria-label="CareerBuild — go to homepage"
        >
          <div
            className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors"
            aria-hidden="true"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="6"
                height="8"
                rx="1.2"
                fill="white"
                opacity="0.9"
              />
              <rect
                x="10"
                y="2"
                width="6"
                height="5"
                rx="1.2"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="2"
                y="12"
                width="14"
                height="2"
                rx="1"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="2"
                y="15.5"
                width="9"
                height="1.5"
                rx="0.75"
                fill="white"
                opacity="0.5"
              />
            </svg>
          </div>
          <span className="text-base font-bold text-zinc-900 tracking-tight">
            CareerBuild
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA / Professional User Menu Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthLoading ? (
            <div className="w-28 h-9 rounded-full bg-zinc-100 animate-pulse"></div>
          ) : authUser ? (
            /* Logged In User State: Show Pixel-Perfect User Pill + Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`group flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer border ${
                  dropdownOpen
                    ? "border-indigo-400 ring-3 ring-indigo-500/10 bg-indigo-50/20"
                    : "border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50/60"
                }`}
              >
                {/* Avatar Wrapper with Unclipped Online Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-7 h-7 rounded-full overflow-hidden ring-1.5 ring-indigo-500/25 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                    {authUser.avatar && !authUser.avatar.includes("default-user") ? (
                      <img
                        src={authUser.avatar}
                        alt={authUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{authUser.name ? authUser.name.charAt(0).toUpperCase() : "U"}</span>
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-2xs" />
                </div>

                {/* User Name */}
                <span className="text-xs font-bold text-zinc-800 tracking-tight max-w-[130px] truncate">
                  {authUser.name}
                </span>

                {/* Pro Tag */}
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-100/90 tracking-wide uppercase">
                  PRO
                </span>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-indigo-600 font-bold" : ""
                  }`}
                />
              </button>

              {/* Glassmorphic Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-xl p-2.5 z-50 text-left"
                  >
                    {/* User Card Header */}
                    <div className="p-3 bg-gradient-to-br from-zinc-50 to-indigo-50/30 rounded-xl mb-2 border border-zinc-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-indigo-200 flex-shrink-0 bg-indigo-600 text-white flex items-center justify-center text-sm font-extrabold">
                          {authUser.avatar ? (
                            <img
                              src={authUser.avatar}
                              alt={authUser.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{authUser.name ? authUser.name.charAt(0) : "U"}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-zinc-900 truncate">
                            {authUser.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 truncate">
                            {authUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-zinc-200/60 flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-zinc-500">
                          Account Status
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                          <ShieldCheck className="w-3 h-3 text-indigo-600" />
                          {authUser.plan || "PRO Plan"}
                        </span>
                      </div>
                    </div>

                    {/* Primary CTA: Go to Dashboard */}
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full py-2.5 px-3 mb-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4 text-indigo-200" />
                        <span>Go to Dashboard</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Quick Nav Links */}
                    <div className="space-y-0.5 text-xs font-medium text-zinc-700">
                      <Link
                        href="/dashboard/my-resumes"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                      >
                        <FileText className="w-4 h-4 text-zinc-400" />
                        <span>My Resumes</span>
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    {/* Log Out Divider */}
                    <div className="pt-1.5 mt-1.5 border-t border-zinc-100">
                      <button
                        type="button"
                        onClick={handleLogout}
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
          ) : (
            /* Logged Out State: Show Log In & Create Resume */
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2 rounded-md hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Log In
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Create Resume
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={20} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={shouldReduceMotion ? {} : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={20} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            variants={shouldReduceMotion ? {} : menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-b border-zinc-200 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  custom={i}
                  variants={shouldReduceMotion ? {} : linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 pb-1 border-t border-zinc-100 mt-3 flex flex-col gap-2">
                {authUser ? (
                  <>
                    <div className="p-3 bg-zinc-50 rounded-xl mb-1 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {authUser.name ? authUser.name.charAt(0) : "U"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-zinc-900 truncate">
                          {authUser.name}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {authUser.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Go to Dashboard</span>
                      <LayoutDashboard className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-center transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Create Resume
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
