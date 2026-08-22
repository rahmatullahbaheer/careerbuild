"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, {
  fadeUp,
  slideInLeft,
  slideInRight,
} from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const sidebarItems = [
  { label: "Personal Info", icon: "👤", active: true },
  { label: "Experience", icon: "💼", active: false },
  { label: "Education", icon: "🎓", active: false },
  { label: "Skills", icon: "⚡", active: false },
  { label: "Summary", icon: "📝", active: false },
];

const templateOptions = ["Executive", "Modern", "Minimal", "Creative"];

function EditorSidebar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-white border-r border-zinc-100 rounded-l-2xl overflow-hidden flex flex-col">
      {/* Sidebar header */}
      <div className="px-4 py-3.5 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full bg-red-400"
            aria-hidden="true"
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-amber-400"
            aria-hidden="true"
          />
          <div
            className="w-2.5 h-2.5 rounded-full bg-emerald-400"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Template selector */}
      <div className="px-4 py-3 border-b border-zinc-100">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
          Template
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {templateOptions.map((t, i) => (
            <motion.button
              key={t}
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.3 }}
              className={`px-2 py-1.5 text-[10px] font-medium rounded-lg border transition-colors ${
                i === 0
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
              }`}
              aria-pressed={i === 0}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-2" aria-label="Resume sections">
        {sidebarItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.09, duration: 0.35 }}
          >
            <button
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="text-sm" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
              {item.active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
              )}
            </button>
          </motion.div>
        ))}
      </nav>

      {/* Progress */}
      <div className="px-4 py-3 border-t border-zinc-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-medium text-zinc-500">
            Profile Complete
          </span>
          <span className="text-[10px] font-bold text-indigo-600">72%</span>
        </div>
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

function ResumePreviewPanel() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-zinc-50 rounded-r-2xl p-4 overflow-hidden">
      <div className="max-w-xs mx-auto">
        {/* Mini resume preview */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-zinc-200/90 overflow-hidden text-left"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 px-3.5 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 font-bold text-white text-xs flex items-center justify-center flex-shrink-0">
                SC
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  Sophia Chen
                </div>
                <div className="text-[9px] text-blue-200 truncate">
                  Senior Product Designer
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-[8px] text-zinc-300 mt-2 pt-1.5 border-t border-white/10">
              <span>sophia@design.co</span>
              <span>•</span>
              <span>San Francisco</span>
            </div>
          </div>

          <div className="p-3 space-y-2.5 text-[9px] text-zinc-700">
            {/* Experience */}
            <div>
              <div className="text-[8px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                Experience
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between font-bold text-zinc-900">
                    <span>Lead UX Designer</span>
                    <span className="text-zinc-400 font-normal">
                      2022 – Now
                    </span>
                  </div>
                  <div className="text-[8px] text-blue-600 font-medium">
                    Stripe Labs
                  </div>
                  <p className="text-[8px] text-zinc-500 line-clamp-2 mt-0.5">
                    Redesigned checkout flows increasing mobile conversion rate
                    by 24%.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="border-t border-zinc-100 pt-2">
              <div className="text-[8px] font-bold uppercase tracking-wider text-blue-700 mb-1">
                Core Skills
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  "Design Systems",
                  "Figma",
                  "UI/UX",
                  "Prototyping",
                  "User Research",
                ].map((s) => (
                  <span
                    key={s}
                    className="px-1.5 py-0.5 text-[7.5px] bg-blue-50 text-blue-700 font-medium rounded"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action bar */}
        <motion.div
          className="mt-3 flex items-center gap-2"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <button className="flex-1 py-2 text-[10px] font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            Save & Preview
          </button>
          <button className="px-3 py-2 text-[10px] font-medium border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 transition-colors">
            Export PDF
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProductPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="product"
      className="py-12 sm:py-16 lg:py-18 bg-zinc-50/60 border-y border-zinc-100"
      aria-labelledby="product-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: copy */}
          <AnimatedSection variants={slideInLeft}>
            <SectionHeader
              eyebrow="Product"
              heading={
                <>
                  Build Your Resume{" "}
                  <span className="gradient-text">Without the Stress</span>
                </>
              }
              subheading="A clean, intuitive editor with live preview so you always know exactly how your resume looks. Switch templates, update sections, and export — all in one place."
              align="left"
              id="product-heading"
            />

            <ul className="mt-8 space-y-3" aria-label="Product features">
              {[
                "Live resume preview updates as you type",
                "Switch between templates instantly",
                "AI suggestions for every section",
                "One-click PDF download",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-600"
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#4f46e5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Right: product mock */}
          <AnimatedSection variants={slideInRight}>
            <div
              className="grid grid-cols-5 rounded-2xl border border-zinc-200 shadow-xl overflow-hidden bg-white"
              role="img"
              aria-label="CareerBuild resume editor interface showing sidebar navigation and live resume preview"
            >
              <div className="col-span-2">
                <EditorSidebar />
              </div>
              <div className="col-span-3">
                <ResumePreviewPanel />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
