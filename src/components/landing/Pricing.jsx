"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, {
  fadeUp,
  staggerContainer,
} from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

// Configure these values easily
const PRICING = {
  free: {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started building your resume.",
    features: [
      "3 resume templates",
      "Resume builder & editor",
      "Real-time preview",
      "1 active resume",
      "PDF download",
    ],
    cta: "Start Free",
    ctaHref: "/signup",
    highlighted: false,
  },
  pro: {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Advanced tools for serious job seekers who want an edge.",
    features: [
      "100+ premium templates",
      "AI-powered suggestions",
      "Unlimited resumes",
      "PDF & Word export",
      "Advanced customization",
      "ATS score analysis",
      "Priority support",
    ],
    cta: "Get Pro",
    ctaHref: "/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
};

function PlanCard({ plan, highlighted }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }
      }
      className={`relative flex flex-col rounded-2xl border p-8 ${
        highlighted
          ? "bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-500/20"
          : "bg-white border-zinc-200 shadow-sm"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 text-xs font-bold text-white bg-zinc-900 rounded-full shadow-sm">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name & description */}
      <div className="mb-6">
        <h3
          className={`text-base font-bold mb-1 ${
            highlighted ? "text-indigo-200" : "text-zinc-500"
          }`}
        >
          {plan.name}
        </h3>
        <div className="flex items-end gap-1.5 mb-2">
          <span
            className={`text-4xl font-bold tracking-tight ${
              highlighted ? "text-white" : "text-zinc-900"
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-sm mb-1.5 ${
              highlighted ? "text-indigo-300" : "text-zinc-400"
            }`}
          >
            / {plan.period}
          </span>
        </div>
        <p
          className={`text-sm leading-relaxed ${
            highlighted ? "text-indigo-200" : "text-zinc-500"
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Features */}
      <ul
        className="flex-1 space-y-3 mb-8"
        aria-label={`${plan.name} plan features`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                highlighted ? "bg-white/20" : "bg-indigo-50"
              }`}
              aria-hidden="true"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5l2 2 4-4"
                  stroke={highlighted ? "#ffffff" : "#4f46e5"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={`text-sm ${
                highlighted ? "text-indigo-100" : "text-zinc-600"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={plan.ctaHref}
        className={`block text-center px-6 py-3 text-sm font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          highlighted
            ? "bg-white text-indigo-600 hover:bg-indigo-50 focus-visible:ring-white focus-visible:ring-offset-indigo-600"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus-visible:ring-indigo-500"
        }`}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="pricing"
      className="py-12 sm:py-16 lg:py-18 bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection
          variants={fadeUp}
          className="text-center mb-8 sm:mb-10"
        >
          <SectionHeader
            eyebrow="Pricing"
            heading={
              <>
                Simple Pricing.{" "}
                <span className="gradient-text">Powerful Resumes.</span>
              </>
            }
            subheading="Start free and upgrade when you need more. No hidden fees, no commitments."
            id="pricing-heading"
          />
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <PlanCard plan={PRICING.free} highlighted={false} />
          <PlanCard plan={PRICING.pro} highlighted={true} />
        </motion.div>

        <AnimatedSection variants={fadeUp} className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            All plans include a 7-day money-back guarantee. Pricing is
            configurable — set values before launch.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
