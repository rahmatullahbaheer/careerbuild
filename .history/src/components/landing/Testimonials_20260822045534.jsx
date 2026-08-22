"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection, { fadeUp, staggerContainer } from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    company: "Tech Startup",
    quote:
      "CareerBuild made creating my resume incredibly easy. I went from a blank page to a professional resume in less than 20 minutes. I landed 3 interviews the following week.",
    rating: 5,
    initials: "SM",
    color: "bg-indigo-500",
  },
  {
    name: "James Okonkwo",
    role: "Software Engineer",
    company: "FinTech Company",
    quote:
      "The ATS-friendly templates gave me so much confidence when applying. The AI suggestions helped me phrase my experience in a way that actually highlights my impact.",
    rating: 5,
    initials: "JO",
    color: "bg-violet-500",
  },
  {
    name: "Priya Sharma",
    role: "UX Designer",
    company: "Design Agency",
    quote:
      "As a designer, I have high standards for how things look. CareerBuild's templates actually look professional and the real-time preview made it so easy to get everything perfect.",
    rating: 5,
    initials: "PS",
    color: "bg-rose-500",
  },
  {
    name: "Daniel Torres",
    role: "Recent Graduate",
    company: "Job Seeker",
    quote:
      "I had no idea how to structure a resume as a new grad. CareerBuild guided me through every section and the result looked polished and professional. Got my first job offer within a month.",
    rating: 5,
    initials: "DT",
    color: "bg-emerald-500",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? "#f59e0b" : "#d4d4d8"}
          aria-hidden="true"
        >
          <path d="M7 1.5L8.5 5.5H12.5L9.5 8L10.5 12L7 9.5L3.5 12L4.5 8L1.5 5.5H5.5L7 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
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
                  delay: index * 0.1,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }
      }
      className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all"
    >
      <StarRating count={testimonial.rating} />
      <blockquote className="mt-4 text-sm text-zinc-600 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-zinc-100">
        <div
          className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center flex-shrink-0`}
          aria-hidden="true"
        >
          <span className="text-sm font-bold text-white">{testimonial.initials}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-900">{testimonial.name}</div>
          <div className="text-xs text-zinc-400">
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-28 bg-zinc-50/60 border-y border-zinc-100"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeUp} className="text-center mb-14">
          <SectionHeader
            eyebrow="Testimonials"
            heading={
              <>
                Trusted by{" "}
                <span className="gradient-text">Real Job Seekers</span>
              </>
            }
            subheading="See what people are saying about their experience building resumes with CareerBuild."
            id="testimonials-heading"
          />
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-zinc-400">
          * Testimonials are illustrative examples — replace with verified customer reviews before launch.
        </p>
      </div>
    </section>
  );
}
