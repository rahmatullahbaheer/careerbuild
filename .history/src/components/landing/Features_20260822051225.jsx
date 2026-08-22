"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutTemplate,
  ShieldCheck,
  Sliders,
  Sparkles,
  MonitorCheck,
  FileDown,
} from "lucide-react";
import SectionHeader from "./shared/SectionHeader";
import AnimatedSection, {
  fadeUp,
  staggerContainer,
} from "./shared/AnimatedSection";

const features = [
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description:
      "Choose from professionally designed resume templates crafted to impress hiring managers in any industry.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: ShieldCheck,
    title: "ATS-Friendly",
    description:
      "Create resumes built with clean structure and readable formatting designed to work well with applicant tracking systems.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Sliders,
    title: "Easy Resume Builder",
    description:
      "Build and edit your resume with a simple, intuitive interface that guides you through every section.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description:
      "Get intelligent suggestions for your experience bullets, skills, and professional summaries to strengthen your resume.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: MonitorCheck,
    title: "Real-Time Preview",
    description:
      "See exactly how your resume looks as you make changes — no surprises when you export.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: FileDown,
    title: "PDF Export",
    description:
      "Download a polished, print-ready PDF in one click — ready to send to employers or upload to job boards.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

function FeatureCard({ feature, index }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.article
      variants={
        shouldReduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }
      }
      whileHover={
        shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }
      }
      className="group relative p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all cursor-default"
    >
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.bg} mb-4`}
        aria-hidden="true"
      >
        <Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={2} />
      </div>
      <h3 className="text-base font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {feature.title}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed">
        {feature.description}
      </p>
    </motion.article>
  );
}

export default function Features() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeUp} className="text-center mb-14">
          <SectionHeader
            eyebrow="Features"
            heading={
              <>
                Everything You Need to Build{" "}
                <span className="gradient-text">a Better Resume</span>
              </>
            }
            subheading="Powerful tools that make creating a professional resume simple, fast, and effective."
            id="features-heading"
          />
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
