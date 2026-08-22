"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Realistic Professional Resume Preview
function ResumePreview() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 rounded-3xl bg-blue-600/10 blur-2xl scale-95 translate-y-4"
        aria-hidden="true"
      />

      {/* Resume Card Shell */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl border border-zinc-200/90 overflow-hidden text-left select-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Interactive real resume preview"
      >
        {/* Top Accent Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-5 text-white">
          <div className="flex items-center gap-3.5">
            {/* Real Avatar with Status Indicator */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-bold text-white text-base tracking-tight">
                  AW
                </div>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-xs"
                title="Available for hire"
              />
            </div>

            {/* Candidate Name & Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold tracking-tight text-white truncate">
                  Alexander Wright
                </h3>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              </div>
              <p className="text-xs font-medium text-blue-200/90 truncate">
                Senior Full-Stack Engineer & Tech Lead
              </p>
            </div>
          </div>

          {/* Real Contact Badges */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-white/10 text-[10px] text-zinc-300">
            <div className="flex items-center gap-1.5 truncate">
              <Mail className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">alex.wright@engineer.io</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Phone className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">+1 (415) 890-2341</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Globe className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">github.com/alexwright</span>
            </div>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5 text-zinc-800 bg-white">
          {/* Professional Summary */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span>Professional Summary</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-600 bg-blue-50/40 p-2 rounded-lg border border-blue-100/60">
              Results-driven engineer with 7+ years architecting scalable
              full-stack web applications, leading agile teams, and improving
              enterprise SaaS performance by 40%.
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-blue-600" />
                <span>Work Experience</span>
              </div>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                ATS Optimized
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Role 1 */}
              <div className="border-l-2 border-blue-600 pl-2.5">
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="font-bold text-zinc-900">
                    Lead Full-Stack Engineer
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-500">
                    2022 — Present
                  </span>
                </div>
                <div className="text-[10px] font-medium text-blue-600 mb-1">
                  TechScale Platforms Inc. • San Francisco, CA
                </div>
                <ul className="text-[10px] text-zinc-600 space-y-0.5 list-disc list-inside">
                  <li>
                    Architected Next.js micro-frontends serving 3M+ active
                    monthly users.
                  </li>
                  <li>
                    Reduced API payload latency by 42% via edge caching
                    strategies.
                  </li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="border-l-2 border-zinc-300 pl-2.5">
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="font-bold text-zinc-900">
                    Senior Frontend Developer
                  </span>
                  <span className="text-[9px] font-semibold text-zinc-500">
                    2019 — 2022
                  </span>
                </div>
                <div className="text-[10px] font-medium text-zinc-500 mb-1">
                  CloudPeak Software • Austin, TX
                </div>
                <ul className="text-[10px] text-zinc-600 space-y-0.5 list-disc list-inside">
                  <li>
                    Built design system component library adopted by 14 product
                    squads.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Skills & Tech Stack */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1.5">
              Skills & Competencies
            </div>
            <div className="flex flex-wrap gap-1">
              {[
                "React 19",
                "Next.js 16",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "PostgreSQL",
                "GraphQL",
                "Docker",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[9px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200/80 rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1 text-zinc-700">
              <GraduationCap className="w-3 h-3 text-blue-600" />
              <span className="font-bold">B.S. in Computer Science</span>
              <span className="text-zinc-400">• UC Berkeley</span>
            </div>
            <span className="font-semibold text-zinc-500">3.9 GPA</span>
          </div>
        </div>
      </motion.div>

      {/* Floating UI Badge — ATS Score */}
      <motion.div
        className="absolute -right-3 sm:-right-5 top-6 bg-white rounded-xl shadow-xl border border-zinc-200/90 px-3 py-2 flex items-center gap-2.5 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            ATS Score
          </div>
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <span>98%</span>
            <span className="text-[9px] font-medium text-zinc-400">
              (Passed)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating UI Badge — Template Style */}
      <motion.div
        className="absolute -left-3 sm:-left-5 bottom-10 bg-white rounded-xl shadow-xl border border-zinc-200/90 px-3.5 py-2 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 mb-0.5">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[10px] font-bold text-zinc-900">
            Executive Pro
          </span>
        </div>
        <div className="text-[9px] font-medium text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Recruiter Approved
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const visualVariants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
        },
      };

  return (
    <section
      className="relative min-h-screen flex items-center pt-3 overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 landing-dot-grid opacity-60"
        aria-hidden="true"
      />
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div
        className="glow-blob w-96 h-96 bg-blue-200/30 top-20 -left-24"
        aria-hidden="true"
      />
      <div
        className="glow-blob w-72 h-72 bg-indigo-200/20 bottom-20 right-10"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
                <span aria-hidden="true">✨</span>
                Build your career with confidence
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6"
            >
              Build a Resume{" "}
              <span className="gradient-text">That Gets You Noticed.</span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-zinc-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Create a professional, ATS-friendly resume in minutes. Choose a
              beautiful template, add your experience, and create a resume
              designed to help you stand out.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Create My Resume
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#templates"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Explore Templates
              </Link>
            </motion.div>

            {/* Trust text */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm text-zinc-400 flex items-center justify-center lg:justify-start gap-2"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1.5L8.5 5.5H13L9.5 8L11 12L7 9.5L3 12L4.5 8L1 5.5H5.5L7 1.5Z"
                  fill="#10b981"
                />
              </svg>
              No credit card required · Build your resume in minutes
            </motion.p>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            variants={visualVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <ResumePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
