"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, { fadeUp, staggerContainer } from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const templates = [
  {
    name: "Executive Pro",
    category: "Executive",
    accentColor: "#1e293b",
    headerBg: "bg-slate-900",
    badge: "bg-slate-100 text-slate-700",
    popular: false,
  },
  {
    name: "Modern Clean",
    category: "Modern",
    accentColor: "#4f46e5",
    headerBg: "bg-indigo-600",
    badge: "bg-indigo-50 text-indigo-700",
    popular: true,
  },
  {
    name: "Minimal Edge",
    category: "Minimal",
    accentColor: "#18181b",
    headerBg: "bg-zinc-900",
    badge: "bg-zinc-100 text-zinc-700",
    popular: false,
  },
  {
    name: "Creative Studio",
    category: "Creative",
    accentColor: "#7c3aed",
    headerBg: "bg-violet-600",
    badge: "bg-violet-50 text-violet-700",
    popular: false,
  },
  {
    name: "ATS Shield",
    category: "ATS-Friendly",
    accentColor: "#059669",
    headerBg: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    popular: false,
  },
  {
    name: "Pro Classic",
    category: "Professional",
    accentColor: "#0369a1",
    headerBg: "bg-sky-700",
    badge: "bg-sky-50 text-sky-700",
    popular: false,
  },
];

function TemplateMockup({ template }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm w-full aspect-[3/4] flex flex-col" aria-hidden="true">
      {/* Template header */}
      <div className={`${template.headerBg} px-3 py-3 flex-shrink-0`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-white/25" />
          <div>
            <div className="h-2 bg-white/80 rounded-full w-16 mb-1" />
            <div className="h-1.5 bg-white/50 rounded-full w-12" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-1.5 bg-white/40 rounded-full w-10" />
          <div className="h-1.5 bg-white/40 rounded-full w-12" />
        </div>
      </div>

      {/* Template body */}
      <div className="flex-1 px-3 py-3 space-y-2.5">
        <div>
          <div className="h-1.5 rounded-full w-14 mb-1.5" style={{ backgroundColor: template.accentColor + "66" }} />
          <div className="space-y-1">
            <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
            <div className="h-1.5 bg-zinc-100 rounded-full w-4/5" />
          </div>
        </div>
        <div>
          <div className="h-1.5 rounded-full w-16 mb-1.5" style={{ backgroundColor: template.accentColor + "66" }} />
          <div className="space-y-1">
            <div className="h-1.5 bg-zinc-200 rounded-full w-20" />
            <div className="h-1 bg-zinc-100 rounded-full w-full" />
            <div className="h-1 bg-zinc-100 rounded-full w-5/6" />
          </div>
        </div>
        <div>
          <div className="h-1.5 rounded-full w-10 mb-1.5" style={{ backgroundColor: template.accentColor + "66" }} />
          <div className="flex flex-wrap gap-1">
            {[12, 16, 10, 14].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded-full"
                style={{ width: `${w * 4}px`, backgroundColor: template.accentColor + "22" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={
        shouldReduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 24 },
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
      className="group relative flex flex-col"
    >
      {/* Popular badge */}
      {template.popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      {/* Mockup with hover overlay */}
      <div className="relative overflow-hidden rounded-xl mb-3 border border-zinc-200 group-hover:border-indigo-300 transition-colors shadow-sm group-hover:shadow-md">
        <TemplateMockup template={template} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href="/dashboard"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 border border-white/40 rounded-lg backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Use ${template.name} template`}
          >
            Use Template
          </a>
        </div>
      </div>

      {/* Template info */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">{template.name}</h3>
          <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] font-medium rounded-full ${template.badge}`}>
            {template.category}
          </span>
        </div>
        <a
          href="/dashboard"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          aria-label={`Preview ${template.name} template`}
        >
          Preview →
        </a>
      </div>
    </motion.article>
  );
}

export default function Templates() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="templates"
      className="py-20 lg:py-28 bg-zinc-50/60 border-y border-zinc-100"
      aria-labelledby="templates-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeUp} className="text-center mb-14">
          <SectionHeader
            eyebrow="Templates"
            heading={
              <>
                Professional Templates{" "}
                <span className="gradient-text">for Every Career</span>
              </>
            }
            subheading="Choose from a growing collection of expert-designed resume templates, optimized for readability and recruiter appeal."
            id="templates-heading"
          />
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {templates.map((template, i) => (
            <TemplateCard key={template.name} template={template} index={i} />
          ))}
        </motion.div>

        <AnimatedSection variants={fadeUp} className="text-center mt-10">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Browse all templates
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
