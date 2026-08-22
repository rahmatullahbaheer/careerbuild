"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

// Realistic resume preview mock
function ResumePreview() {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Floating card shadow */}
      <div
        className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur-2xl scale-95 translate-y-4"
        aria-hidden="true"
      />
      {/* Resume card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {/* Resume header bar */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/25 flex-shrink-0" />
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="h-3 bg-white/80 rounded-full w-28 mb-2" />
              <div className="h-2 bg-white/50 rounded-full w-20" />
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="h-2 bg-white/40 rounded-full w-16" />
            <div className="h-2 bg-white/40 rounded-full w-20" />
            <div className="h-2 bg-white/40 rounded-full w-14" />
          </div>
        </div>

        {/* Resume body */}
        <div className="px-5 py-4 space-y-4">
          {/* Summary */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 mb-1.5">
              Professional Summary
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-zinc-100 rounded-full w-full" />
              <div className="h-2 bg-zinc-100 rounded-full w-5/6" />
              <div className="h-2 bg-zinc-100 rounded-full w-4/5" />
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 mb-1.5">
              Experience
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="h-2.5 bg-zinc-800 rounded-full w-28" />
                  <div className="h-2 bg-zinc-300 rounded-full w-16" />
                </div>
                <div className="h-2 bg-zinc-200 rounded-full w-24 mb-1" />
                <div className="space-y-1">
                  <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
                  <div className="h-1.5 bg-zinc-100 rounded-full w-5/6" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="h-2.5 bg-zinc-800 rounded-full w-24" />
                  <div className="h-2 bg-zinc-300 rounded-full w-14" />
                </div>
                <div className="h-2 bg-zinc-200 rounded-full w-20 mb-1" />
                <div className="space-y-1">
                  <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
                  <div className="h-1.5 bg-zinc-100 rounded-full w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 mb-1.5">
              Skills
            </div>
            <div className="flex flex-wrap gap-1">
              {["React", "Node.js", "TypeScript", "SQL", "Figma"].map((s) => (
                <span
                  key={s}
                  className="px-1.5 py-0.5 text-[8px] font-medium bg-indigo-50 text-indigo-700 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating UI badge — ATS score */}
      <motion.div
        className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg border border-zinc-100 px-3 py-2 flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7L5.5 10L11.5 4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="text-[9px] font-semibold text-zinc-900">ATS Score</div>
          <div className="text-[10px] font-bold text-emerald-600">96%</div>
        </div>
      </motion.div>

      {/* Floating UI badge — Template */}
      <motion.div
        className="absolute -left-4 bottom-12 bg-white rounded-xl shadow-lg border border-zinc-100 px-3 py-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="text-[9px] font-semibold text-zinc-500 mb-0.5">Template</div>
        <div className="text-[10px] font-bold text-zinc-900">Executive Pro</div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: 0.1 },
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
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 landing-dot-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div
        className="glow-blob w-96 h-96 bg-indigo-200/40 top-20 -left-24"
        aria-hidden="true"
      />
      <div
        className="glow-blob w-72 h-72 bg-violet-200/30 bottom-20 right-10"
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5L8.5 5.5H13L9.5 8L11 12L7 9.5L3 12L4.5 8L1 5.5H5.5L7 1.5Z" fill="#10b981"/>
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
