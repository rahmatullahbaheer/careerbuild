"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection, {
  fadeUp,
  staggerContainer,
} from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const faqs = [
  {
    question: "What is CareerBuild?",
    answer:
      "CareerBuild is an online resume builder that helps you create professional, ATS-friendly resumes quickly. It offers a variety of templates, a guided editor, real-time preview, and AI-powered suggestions to improve your resume content.",
  },
  {
    question: "Can I create a resume for free?",
    answer:
      "Yes! CareerBuild offers a free plan that includes access to core templates, the resume builder, real-time preview, and PDF download. You can upgrade to Pro for access to premium templates, AI suggestions, and unlimited resumes.",
  },
  {
    question: "Are CareerBuild resumes ATS-friendly?",
    answer:
      "CareerBuild templates are designed with clean structure, standard section headings, and proper formatting that many ATS platforms can parse effectively. While we follow industry best practices, ATS compatibility can vary across systems and specific job applications.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. Both the free and Pro plans include PDF download. Pro subscribers also get additional export options and advanced formatting controls.",
  },
  {
    question: "Can I create multiple resumes?",
    answer:
      "Free users can maintain one active resume at a time. Pro subscribers can create and store unlimited resumes — useful for tailoring your application to different roles or industries.",
  },
  {
    question: "Can I customize my resume template?",
    answer:
      "Absolutely. Every template can be customized — you can adjust the color scheme, font style, section order, and layout. Pro users have access to advanced customization options.",
  },
  {
    question: "Does CareerBuild work on mobile?",
    answer:
      "Yes, CareerBuild is fully responsive and works on mobile browsers. For the best editing experience, we recommend using a tablet or desktop.",
  },
  {
    question: "Can AI help improve my resume?",
    answer:
      "Yes! Pro subscribers get access to AI-powered suggestions for experience bullets, professional summaries, skills sections, and achievement statements. The AI helps turn vague descriptions into specific, compelling statements.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const id = `faq-answer-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      variants={
        shouldReduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.06,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }
      }
      className="border border-zinc-100 rounded-xl overflow-hidden bg-white hover:border-zinc-200 transition-colors"
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
      >
        <span className="text-sm font-semibold text-zinc-900">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.2,
            ease: "easeInOut",
          }}
          className="flex-shrink-0 text-zinc-400"
          aria-hidden="true"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-labelledby={buttonId}
            key="content"
            initial={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-zinc-50/60 border-y border-zinc-100"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeUp} className="text-center mb-12">
          <SectionHeader
            eyebrow="FAQ"
            heading="Frequently Asked Questions"
            subheading="Everything you need to know about CareerBuild. Can't find the answer you're looking for? Contact our support team."
            id="faq-heading"
          />
        </AnimatedSection>

        <motion.div
          className="space-y-3"
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          aria-label="Frequently asked questions"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} item={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
