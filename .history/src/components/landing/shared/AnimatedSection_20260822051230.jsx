"use client";

import { motion, useReducedMotion } from "framer-motion";

// ─── Reusable animation variants ────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.0,
    },
  },
};

// ─── AnimatedSection wrapper ─────────────────────────────────────────────────
// Wraps children in a motion.div that animates when entering the viewport.
// Respects prefers-reduced-motion automatically.

export default function AnimatedSection({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
  once = true,
  amount = 0.15,
  as = "div",
}) {
  const shouldReduceMotion = useReducedMotion();

  const Tag = motion[as] || motion.div;

  const effectiveVariants = shouldReduceMotion
    ? {
        hidden: {},
        visible: {},
      }
    : variants;

  const effectiveTransition = delay
    ? {
        transition: { delay },
      }
    : {};

  return (
    <Tag
      className={className}
      variants={effectiveVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...(delay && {
        variants: {
          ...effectiveVariants,
          visible: {
            ...effectiveVariants.visible,
            transition: {
              ...(effectiveVariants.visible?.transition || {}),
              delay,
            },
          },
        },
      })}
    >
      {children}
    </Tag>
  );
}
