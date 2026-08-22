"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Star,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Check,
} from "lucide-react";
import AnimatedSection, {
  fadeUp,
  staggerContainer,
} from "./shared/AnimatedSection";

const stats = [
  {
    id: "resumes",
    value: "50K+",
    number: "52,480",
    label: "Resumes Created",
    sublabel: "Job seekers hired worldwide",
    badge: "+28% this month",
    badgeType: "trend",
    icon: FileText,
    accentColor: "blue",
    iconBg: "bg-blue-500/10 text-blue-600 border-blue-200/60",
    gradientHover: "from-blue-600/5 via-blue-500/5 to-transparent",
    borderHover: "hover:border-blue-300/80 hover:shadow-blue-500/10",
  },
  {
    id: "templates",
    value: "100+",
    number: "120+",
    label: "ATS-Ready Templates",
    sublabel: "Curated for every industry",
    badge: "Updated Weekly",
    badgeType: "sparkle",
    icon: Award,
    accentColor: "indigo",
    iconBg: "bg-indigo-500/10 text-indigo-600 border-indigo-200/60",
    gradientHover: "from-indigo-600/5 via-indigo-500/5 to-transparent",
    borderHover: "hover:border-indigo-300/80 hover:shadow-indigo-500/10",
  },
  {
    id: "ats",
    value: "95%",
    number: "96.4%",
    label: "ATS Compatibility Rate",
    sublabel: "Tested against top ATS scanners",
    badge: "Recruiter Verified",
    badgeType: "check",
    icon: ShieldCheck,
    accentColor: "emerald",
    iconBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200/60",
    gradientHover: "from-emerald-600/5 via-emerald-500/5 to-transparent",
    borderHover: "hover:border-emerald-300/80 hover:shadow-emerald-500/10",
  },
  {
    id: "rating",
    value: "4.9/5",
    number: "4.94",
    label: "Candidate Satisfaction",
    sublabel: "From 12,000+ verified ratings",
    badge: "★ ★ ★ ★ ★",
    badgeType: "stars",
    icon: Star,
    accentColor: "amber",
    iconBg: "bg-amber-500/10 text-amber-600 border-amber-200/60",
    gradientHover: "from-amber-600/5 via-amber-500/5 to-transparent",
    borderHover: "hover:border-amber-300/80 hover:shadow-amber-500/10",
  },
];

// High-fidelity Company Logos
const companies = [
  {
    name: "Google",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    ),
  },
  {
    name: "Microsoft",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 1h10v10H1zM13 1h10v10H13zM1 13h10v10H1zM13 13h10v10H13z" />
      </svg>
    ),
  },
  {
    name: "Amazon",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.9 14.3c-1.8 1.4-4.4 2.1-6.7 2.1-3.2 0-6.1-1.2-8.3-3.2-.2-.2 0-.5.2-.3 2.4 1.4 5.3 2.2 8.2 2.2 2 0 4.3-.5 6.4-1.6.3-.2.6.2.2.8zm1.2-1.3c-.2-.3-.5-.4-.8-.1-.1.1-1 .9-2.3 1.1-.3 0-.4.3-.2.5.5.5 1.8 1.1 2.8.2.3-.3.8-1.2.5-1.7zm-2.4-7.5c-2.8 0-4.6 1.7-4.6 4.3 0 2.5 1.5 3.9 3.8 3.9 1.4 0 2.6-.8 3.2-1.8v1.5c0 .2.1.3.3.3h1.8c.2 0 .3-.1.3-.3V9.5c0-2.6-1.8-4-4.8-4zm.1 6.5c-1.3 0-2.2-.9-2.2-2.3 0-1.4.9-2.3 2.2-2.3 1.3 0 2.2.9 2.2 2.3 0 1.4-.9 2.3-2.2 2.3z" />
      </svg>
    ),
  },
  {
    name: "Meta",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.15 13.67c-1.07 0-2.02-.45-2.73-1.18-.73-.75-1.12-1.78-1.12-2.92 0-2.26 1.69-4.14 3.92-4.14 1.12 0 2.12.48 2.82 1.25l-.89.87c-.5-.54-1.2-.87-1.93-.87-1.54 0-2.67 1.32-2.67 2.89 0 .8.27 1.51.76 2.01.49.5 1.17.78 1.91.78.84 0 1.5-.33 2.01-.89l.86.88c-.73.85-1.76 1.32-2.94 1.32zm6.27-.12h-1.25V9.45h-2.12V8.32h5.49v1.13h-2.12v5.1z" />
      </svg>
    ),
  },
  {
    name: "Apple",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.71-.93 2.73.99.08 2.01-.48 2.64-1.23z" />
      </svg>
    ),
  },
  {
    name: "Netflix",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h4.5v14.5L15.5 2H20v20h-4.5V7.5L8.5 22H4V2z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c0-.84-.71-1.32-1.87-1.32-.97 0-1.95.34-2.73.84l-.56-1.54c1.03-.6 2.37-.96 3.64-.96 2.55 0 4.09 1.29 4.09 3.29 0 3.22-4.42 2.7-4.42 4.09 0 .96.86 1.43 2.08 1.43 1.24 0 2.36-.45 3.12-.99l.56 1.58c-.99.69-2.48 1.09-3.95 1.09-2.67 0-4.39-1.37-4.39-3.41 0-3.32 4.43-2.78 4.43-4.09z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    svg: (
      <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.87 7.076-.51 9.722 1.113.294.18.387.563.207.857zm1.226-2.724c-.226.367-.707.482-1.074.256-2.69-1.653-6.79-2.134-9.97-1.168-.413.125-.85-.11-.975-.523-.125-.413.11-.85.523-.975 3.633-1.103 8.147-.568 11.24 1.336.367.226.482.707.256 1.074zm.106-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.13-1.168-.624-.15-.494.13-1.018.624-1.168 3.532-1.072 9.404-.87 13.114 1.332.445.264.59.838.327 1.282-.264.444-.838.59-1.282.327z" />
      </svg>
    ),
  },
];

function StatCard({ stat, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const Icon = stat.icon;

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.1,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }
      }
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              scale: 1.015,
              transition: { duration: 0.25, ease: "easeOut" },
            }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default ${stat.borderHover}`}
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.gradientHover} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden="true"
      />

      {/* Top Bar: Icon & Dynamic Badge */}
      <div className="flex items-center justify-between gap-2 mb-5 relative z-10">
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 ${stat.iconBg}`}
        >
          <Icon className="w-5 h-5" strokeWidth={2.2} />
        </div>

        {/* Status Chip */}
        {stat.badgeType === "trend" && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs">
            <TrendingUp className="w-3 h-3" />
            {stat.badge}
          </span>
        )}

        {stat.badgeType === "sparkle" && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-2xs">
            <Sparkles className="w-3 h-3" />
            {stat.badge}
          </span>
        )}

        {stat.badgeType === "check" && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-2xs">
            <CheckCircle2 className="w-3 h-3" />
            {stat.badge}
          </span>
        )}

        {stat.badgeType === "stars" && (
          <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100 shadow-2xs">
            {stat.badge}
          </span>
        )}
      </div>

      {/* Metric Value */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors duration-200">
            {stat.value}
          </span>
          <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </div>

        <h3 className="text-base font-bold text-zinc-800 mb-1">{stat.label}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">{stat.sublabel}</p>
      </div>

      {/* Bottom Animated Accent Line */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-100 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function TrustStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="py-12 sm:py-16 bg-white border-y border-zinc-200/70 relative overflow-hidden"
      aria-labelledby="trust-heading"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          {/* Live Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/90 text-blue-700 text-xs font-semibold mb-3 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            Proven Career Outcomes
          </div>

          <h2
            id="trust-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight"
          >
            Trusted by Job Seekers Building Their{" "}
            <span className="gradient-text">Next Career Move</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-500 leading-relaxed">
            From first-time graduates to senior engineering leaders, our
            platform delivers measurable results that turn applications into
            interviews.
          </p>
        </AnimatedSection>

        {/* 4 Animated Stat Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Professional Company Proof Showcase */}
        <AnimatedSection
          variants={fadeUp}
          className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-6 sm:p-8"
        >
          {/* Top Label & Verification Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-5 border-b border-zinc-200/70 text-center sm:text-left">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center justify-center sm:justify-start gap-2">
                <span>
                  Candidates built with CareerBuild have interviewed at top
                  companies
                </span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Our templates and keyword optimization match the rigorous hiring
                criteria of global tech & finance leaders.
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-zinc-200 text-zinc-700 text-xs font-semibold shadow-2xs flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>3.4x Interview Rate</span>
            </div>
          </div>

          {/* Company Badges Grid / Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {companies.map((company, i) => (
              <motion.div
                key={company.name}
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-xl bg-white border border-zinc-200/80 hover:border-blue-300 hover:shadow-md hover:text-blue-600 text-zinc-600 transition-all duration-200 group"
              >
                <div className="text-zinc-600 group-hover:text-blue-600 transition-colors">
                  {company.svg}
                </div>
                <span className="text-[11px] font-bold text-zinc-800 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] text-zinc-400">
            * All trademarks and company logos belong to their respective owners
            and are shown for candidate interview verification references.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
