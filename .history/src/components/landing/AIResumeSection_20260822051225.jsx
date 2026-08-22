"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedSection, {
  fadeUp,
  slideInLeft,
  slideInRight,
} from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const examples = [
  {
    label: "Experience Bullet",
    before: "Worked on websites.",
    after:
      "Developed and maintained responsive web applications using React and Node.js, improving page load time by 35% and increasing user engagement metrics.",
  },
  {
    label: "Professional Summary",
    before: "I am a software developer with experience.",
    after:
      "Results-driven software engineer with 5+ years of experience building scalable web applications, leading cross-functional teams, and delivering solutions that drive measurable business impact.",
  },
  {
    label: "Achievement",
    before: "Helped increase sales.",
    after:
      "Spearheaded a data-driven sales optimization initiative that increased quarterly revenue by 28% and reduced customer acquisition costs by 15%.",
  },
];

export default function AIResumeSection() {
  const [activeExample, setActiveExample] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-cycle the animation
  useEffect(() => {
    if (shouldReduceMotion) return;
    const beforeTimer = setTimeout(() => setShowAfter(true), 1200);
    return () => clearTimeout(beforeTimer);
  }, [activeExample, shouldReduceMotion]);

  const handleExampleChange = (i) => {
    setShowAfter(false);
    setActiveExample(i);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowAfter(true);
      return;
    }
    const cycleTimer = setInterval(() => {
      setShowAfter(false);
      setTimeout(() => {
        setActiveExample((prev) => (prev + 1) % examples.length);
      }, 400);
    }, 5000);
    return () => clearInterval(cycleTimer);
  }, [shouldReduceMotion]);

  const current = examples[activeExample];

  return (
    <section
      id="ai"
      className="py-20 lg:py-28 relative overflow-hidden"
      aria-labelledby="ai-heading"
      style={{
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a0a2e 40%, #0a1a2e 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: copy */}
          <AnimatedSection variants={slideInLeft}>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
              AI-Powered
            </p>
            <h2
              id="ai-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-5"
            >
              Make Your Resume{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Stronger With AI
              </span>
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed mb-8">
              CareerBuild helps you improve your resume with intelligent
              suggestions for your experience bullets, skills, professional
              summaries, and achievements — turning vague descriptions into
              compelling, specific statements.
            </p>

            {/* Example tabs */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="AI example types"
            >
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  role="tab"
                  aria-selected={activeExample === i}
                  aria-controls={`ai-panel-${i}`}
                  onClick={() => handleExampleChange(i)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    activeExample === i
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                      : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-300"
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Before/After card */}
          <AnimatedSection variants={slideInRight}>
            <div
              id={`ai-panel-${activeExample}`}
              role="tabpanel"
              aria-label={`${current.label} AI improvement example`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              {/* Before */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-500/20 text-red-400 border border-red-500/20">
                    Before
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/15">
                  <p className="text-sm text-red-300/90 leading-relaxed">
                    {current.before}
                  </p>
                </div>
              </div>

              {/* AI arrow */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/30">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 1.5L7.5 4.5H11L8.5 6.5L9.5 9.5L6 7.5L2.5 9.5L3.5 6.5L1 4.5H4.5L6 1.5Z"
                      fill="#818cf8"
                    />
                  </svg>
                  <span className="text-[10px] font-semibold text-indigo-400">
                    AI Enhanced
                  </span>
                </div>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* After */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    After
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 min-h-[4rem]">
                  <AnimatePresence mode="wait">
                    {showAfter ? (
                      <motion.p
                        key={`after-${activeExample}`}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="text-sm text-emerald-300/90 leading-relaxed"
                      >
                        {current.after}
                      </motion.p>
                    ) : (
                      <motion.div
                        key={`loading-${activeExample}`}
                        className="space-y-2 pt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="h-2 shimmer rounded-full w-full opacity-30" />
                        <div className="h-2 shimmer rounded-full w-5/6 opacity-30" />
                        <div className="h-2 shimmer rounded-full w-4/5 opacity-30" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
