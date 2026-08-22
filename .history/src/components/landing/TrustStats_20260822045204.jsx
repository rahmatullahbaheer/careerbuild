"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, { staggerContainer, fadeUp } from "./shared/AnimatedSection";

const stats = [
  {
    value: "50K+",
    label: "Resumes Created",
    description: "Job seekers have built resumes with CareerBuild",
  },
  {
    value: "100+",
    label: "Professional Templates",
    description: "Designed by professional resume experts",
  },
  {
    value: "95%",
    label: "ATS-Compatible",
    description: "Resumes structured to work with major ATS platforms",
  },
  {
    value: "4.9/5",
    label: "User Rating",
    description: "Average rating from our users",
  },
];

export default function TrustStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="border-y border-zinc-100 bg-zinc-50/50"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <AnimatedSection variants={fadeUp} className="text-center mb-10">
          <p
            id="trust-heading"
            className="text-sm font-medium text-zinc-400 uppercase tracking-widest"
          >
            Trusted by job seekers building their next career move
          </p>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={
                shouldReduceMotion
                  ? {}
                  : {
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }
              }
              className="bg-white px-6 py-8 text-center group hover:bg-indigo-50/50 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm font-semibold text-zinc-700">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-zinc-400 leading-snug hidden sm:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="mt-5 text-center text-xs text-zinc-400">
          * Statistics are illustrative placeholders — replace with verified data before launch.
        </p>
      </div>
    </section>
  );
}
