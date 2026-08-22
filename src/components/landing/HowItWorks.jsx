"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutTemplate,
  Sparkles,
  Download,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Zap,
  MousePointerClick,
} from "lucide-react";
import AnimatedSection, { fadeUp, staggerContainer } from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const steps = [
  {
    step: "01",
    badge: "Step 1 • Design Selection",
    title: "Choose a Template",
    subtitle: "Select from 100+ industry-crafted templates optimized for modern applicant tracking systems.",
    bullets: [
      "Categorized by industry & seniority",
      "One-click layout & font switching",
      "Clean single & multi-column designs",
    ],
    accent: "blue",
    borderHover: "group-hover:border-blue-300",
    gradient: "from-blue-600 to-indigo-600",
    previewType: "template",
  },
  {
    step: "02",
    badge: "Step 2 • Guided Content & AI",
    title: "Add Experience with AI",
    subtitle: "Fill in your background with guided prompts and let AI transform bullet points into impactful achievements.",
    bullets: [
      "Pre-written recruiter bullet suggestions",
      "Instant action-verb & metrics booster",
      "Real-time ATS score & keyword check",
    ],
    accent: "indigo",
    borderHover: "group-hover:border-indigo-300",
    gradient: "from-indigo-600 to-blue-600",
    previewType: "editor",
  },
  {
    step: "03",
    badge: "Step 3 • Job-Ready Export",
    title: "Download & Apply",
    subtitle: "Export your job-ready resume in high-resolution PDF format with guaranteed formatting consistency.",
    bullets: [
      "Print-ready & ATS-scannable PDF",
      "Unlimited edits & version storage",
      "Direct cover letter synchronization",
    ],
    accent: "emerald",
    borderHover: "group-hover:border-emerald-300",
    gradient: "from-emerald-600 to-teal-600",
    previewType: "export",
  },
];

// Mini Visual Preview for Step 1: Template Selection
function Step1Preview() {
  return (
    <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 mb-5 relative overflow-hidden select-none">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Selected Style
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Executive Navy
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Template Option 1 (Active) */}
        <div className="bg-white rounded-lg p-2 border-2 border-blue-600 shadow-xs relative">
          <div className="h-2 bg-blue-900 rounded-sm mb-1.5 w-full" />
          <div className="space-y-1">
            <div className="h-1 bg-zinc-200 rounded-full w-full" />
            <div className="h-1 bg-zinc-200 rounded-full w-4/5" />
            <div className="h-1 bg-blue-200 rounded-full w-1/2" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[8px]">
            ✓
          </span>
        </div>

        {/* Template Option 2 */}
        <div className="bg-white rounded-lg p-2 border border-zinc-200 opacity-60">
          <div className="h-2 bg-zinc-800 rounded-sm mb-1.5 w-full" />
          <div className="space-y-1">
            <div className="h-1 bg-zinc-200 rounded-full w-full" />
            <div className="h-1 bg-zinc-200 rounded-full w-3/4" />
          </div>
        </div>

        {/* Template Option 3 */}
        <div className="bg-white rounded-lg p-2 border border-zinc-200 opacity-60">
          <div className="h-2 bg-emerald-800 rounded-sm mb-1.5 w-full" />
          <div className="space-y-1">
            <div className="h-1 bg-zinc-200 rounded-full w-full" />
            <div className="h-1 bg-zinc-200 rounded-full w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini Visual Preview for Step 2: AI Enhancer
function Step2Preview() {
  return (
    <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 mb-5 relative overflow-hidden select-none">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          AI Bullet Enhancer
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
          <Sparkles className="w-2.5 h-2.5" />
          Enhanced
        </span>
      </div>

      <div className="bg-white rounded-lg p-2.5 border border-zinc-200 space-y-1.5 text-left">
        <div className="text-[9px] text-zinc-400 line-through">
          Worked on front-end components for website.
        </div>
        <div className="text-[9.5px] font-medium text-indigo-900 bg-indigo-50/60 p-1.5 rounded border border-indigo-100/80 leading-snug">
          Architected reusable React 19 component library, boosting team velocity by 35%.
        </div>
      </div>
    </div>
  );
}

// Mini Visual Preview for Step 3: PDF Export
function Step3Preview() {
  return (
    <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200/80 mb-5 relative overflow-hidden select-none">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          Export Document
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
          <ShieldCheck className="w-2.5 h-2.5" />
          98% ATS Pass
        </span>
      </div>

      <div className="bg-white rounded-lg p-2.5 border border-zinc-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold text-[9px]">
            PDF
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-900">Alex_Wright_CV.pdf</div>
            <div className="text-[8px] text-zinc-400">High-Res Print & ATS Ready • 142 KB</div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
          ↓
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-16 lg:py-18 bg-white border-y border-zinc-200/70 relative overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Fast & Effortless Process</span>
          </div>

          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight"
          >
            From Blank Canvas to Interview-Ready in{" "}
            <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-500 leading-relaxed">
            No design or formatting skills needed. Our intelligent platform handles the heavy lifting so you can focus on applying.
          </p>
        </AnimatedSection>

        {/* 3 Step Cards Grid */}
        <div className="relative">
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((stepItem, i) => (
              <motion.div
                key={stepItem.step}
                variants={
                  shouldReduceMotion
                    ? {}
                    : {
                        hidden: { opacity: 0, y: 24 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: i * 0.12,
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
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                }
                className={`group relative bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${stepItem.borderHover}`}
              >
                <div>
                  {/* Top Step Pill & Large Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                      {stepItem.badge}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-zinc-200 group-hover:text-blue-600/30 transition-colors tracking-tight font-mono">
                      {stepItem.step}
                    </span>
                  </div>

                  {/* Dynamic Visual Mockup Preview */}
                  {stepItem.previewType === "template" && <Step1Preview />}
                  {stepItem.previewType === "editor" && <Step2Preview />}
                  {stepItem.previewType === "export" && <Step3Preview />}

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors mb-2">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-4">
                    {stepItem.subtitle}
                  </p>
                </div>

                {/* Feature Bullets Checklist */}
                <div className="pt-4 border-t border-zinc-100 space-y-2">
                  {stepItem.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2 text-xs text-zinc-600 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Quick Facts & CTA */}
        <AnimatedSection
          variants={fadeUp}
          className="mt-10 sm:mt-12 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-zinc-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Free to start
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% ATS compliant
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Average completion: 14 mins
            </span>
          </div>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>Start Building Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
