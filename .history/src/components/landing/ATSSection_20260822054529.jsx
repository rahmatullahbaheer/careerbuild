"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, {
  fadeUp,
  slideInLeft,
  slideInRight,
} from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const checks = [
  {
    label: "Resume Structure",
    description: "Clean, logical layout that ATS parsers can read",
    delay: 0.1,
  },
  {
    label: "Keyword Optimization",
    description: "Standard section headings and role-relevant terminology",
    delay: 0.25,
  },
  {
    label: "Readability",
    description: "Appropriate font sizes, spacing, and line length",
    delay: 0.4,
  },
  {
    label: "Formatting Consistency",
    description: "Uniform date formats, bullet styles, and hierarchy",
    delay: 0.55,
  },
  {
    label: "Contact Information",
    description: "Clear placement of name, email, phone, and location",
    delay: 0.7,
  },
];

function ATSChecker() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="bg-white border border-zinc-200 rounded-2xl shadow-md overflow-hidden"
      role="img"
      aria-label="ATS compatibility checklist showing resume structure, keywords, readability, formatting, and contact information all marked as passing"
    >
      {/* Scanner header */}
      <div className="bg-zinc-900 px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-mono text-zinc-400">
            ats-scanner.exe
          </span>
        </div>
        <div className="font-mono text-xs text-zinc-400 space-y-0.5">
          <p>
            <span className="text-emerald-400">▶</span> Scanning resume...
          </p>
          <p>
            <span className="text-emerald-400">▶</span> Analyzing structure and
            content...
          </p>
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-emerald-400"
          >
            ✓ Scan complete — no issues detected
          </motion.p>
        </div>
      </div>

      {/* Results */}
      <div className="divide-y divide-zinc-100">
        {checks.map((check, i) => (
          <div
            key={check.label}
            className="flex items-center gap-4 px-5 py-3.5"
          >
            {/* Check icon with delayed animation */}
            <motion.div
              className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center"
              initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: check.delay,
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="#10b981"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-zinc-900">
                  {check.label}
                </span>
                <motion.span
                  className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full"
                  initial={shouldReduceMotion ? {} : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: check.delay + 0.15 }}
                >
                  PASS
                </motion.span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {check.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Score footer */}
      <div className="px-5 py-4 bg-emerald-50 border-t border-emerald-100">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-800">
            Overall ATS Compatibility
          </span>
          <motion.span
            className="text-lg font-bold text-emerald-700"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, type: "spring", stiffness: 400 }}
          >
            96%
          </motion.span>
        </div>
        <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-emerald-100">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "96%" }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

export default function ATSSection() {
  return (
    <section
      id="ats"
      className="py-12 sm:py-16 lg:py-18 bg-white"
      aria-labelledby="ats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: ATS mock scanner */}
          <AnimatedSection
            variants={slideInLeft}
            className="order-2 lg:order-1"
          >
            <ATSChecker />
          </AnimatedSection>

          {/* Right: Copy */}
          <AnimatedSection
            variants={slideInRight}
            className="order-1 lg:order-2"
          >
            <SectionHeader
              eyebrow="ATS-Friendly"
              heading={
                <>
                  Designed to Get Past{" "}
                  <span className="gradient-text">
                    Applicant Tracking Systems
                  </span>
                </>
              }
              subheading={null}
              align="left"
              id="ats-heading"
            />
            <p className="mt-4 text-base text-zinc-500 leading-relaxed">
              Many job applications are screened by Applicant Tracking Systems
              before a human ever sees them. CareerBuild focuses on clean
              structure, readable formatting, and standard section headings to
              help your resume get through to the next stage.
            </p>

            <ul
              className="mt-6 space-y-3"
              aria-label="ATS optimization features"
            >
              {[
                "Standard section headings that ATS systems recognize",
                "Clean, single-column and two-column layouts",
                "Proper formatting without tables or text boxes",
                "Recommended contact information placement",
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-600"
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#10b981"
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

            <p className="mt-6 text-xs text-zinc-400 italic">
              * ATS compatibility varies across systems. CareerBuild follows
              industry best practices to optimize resume structure, but cannot
              guarantee results with every ATS platform.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
