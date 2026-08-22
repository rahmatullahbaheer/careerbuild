"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, { fadeUp } from "./shared/AnimatedSection";

export default function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="py-14 sm:py-16 lg:py-20 relative overflow-hidden bg-white"
      aria-labelledby="final-cta-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 landing-dot-grid opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative blobs */}
      <div
        className="glow-blob w-80 h-80 bg-blue-300/15 -top-20 -left-20"
        aria-hidden="true"
      />
      <div
        className="glow-blob w-72 h-72 bg-indigo-300/10 -bottom-10 -right-10"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <AnimatedSection variants={fadeUp} className="mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
            <span aria-hidden="true">🚀</span>
            Ready to get started?
          </span>
        </AnimatedSection>

        {/* Heading */}
        <AnimatedSection variants={fadeUp} delay={0.1} className="mb-4">
          <h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]"
          >
            Your Next Opportunity{" "}
            <span className="gradient-text">Starts With a Better Resume.</span>
          </h2>
        </AnimatedSection>

        {/* Subtext */}
        <AnimatedSection variants={fadeUp} delay={0.2} className="mb-8">
          <p className="text-base sm:text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Build a professional resume today and take the next step toward your
            career goals. No experience required — just your story.
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection variants={fadeUp} delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
            </motion.a>
            <a
              href="#templates"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Explore Templates
            </a>
          </div>
        </AnimatedSection>

        {/* Trust signals */}
        <AnimatedSection variants={fadeUp} delay={0.4} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
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
              No credit card required
            </span>
            <span className="hidden sm:inline text-zinc-200" aria-hidden="true">
              ·
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#10b981"
                  strokeWidth="1.5"
                />
                <path
                  d="M4.5 7L6 8.5L9.5 5"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ready in minutes
            </span>
            <span className="hidden sm:inline text-zinc-200" aria-hidden="true">
              ·
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 2L8.5 5.5H12L9 7.5L10.5 11L7 8.5L3.5 11L5 7.5L2 5.5H5.5L7 2Z"
                  fill="#f59e0b"
                />
              </svg>
              4.9/5 rating
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
