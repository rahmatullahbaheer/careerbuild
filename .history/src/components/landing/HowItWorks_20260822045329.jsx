"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, { fadeUp } from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    description:
      "Browse our collection of professionally designed resume templates. Pick the style that fits your industry and career level.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="3" y="15" width="18" height="2" rx="1" />
        <rect x="3" y="19" width="12" height="2" rx="1" />
      </svg>
    ),
    color: "bg-indigo-600",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    number: "02",
    title: "Add Your Experience",
    description:
      "Enter your education, work experience, skills, and achievements. Our guided builder makes it easy to fill in every section.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    color: "bg-violet-600",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    number: "03",
    title: "Download & Apply",
    description:
      "Download your polished resume as a PDF and start applying for jobs with confidence. Update it anytime as you grow.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      </svg>
    ),
    color: "bg-emerald-600",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeUp} className="text-center mb-16">
          <SectionHeader
            eyebrow="How It Works"
            heading={
              <>
                From Blank Page to{" "}
                <span className="gradient-text">Job-Ready Resume</span>
              </>
            }
            subheading="Three simple steps to create a professional resume that stands out."
            id="how-it-works-heading"
          />
        </AnimatedSection>

        {/* Steps */}
        <ol className="relative grid md:grid-cols-3 gap-8 lg:gap-12" role="list">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-emerald-200"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              variants={
                shouldReduceMotion
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 28 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.18,
                          duration: 0.55,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }
              }
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              {/* Number badge */}
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-700 shadow-sm"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>

              {/* Step number label */}
              <div className={`text-xs font-bold tracking-widest uppercase ${step.textColor} mb-2`}>
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-3">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">{step.description}</p>
            </motion.li>
          ))}
        </ol>

        {/* CTA */}
        <AnimatedSection variants={fadeUp} className="mt-14 text-center" delay={0.3}>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Start Building For Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
