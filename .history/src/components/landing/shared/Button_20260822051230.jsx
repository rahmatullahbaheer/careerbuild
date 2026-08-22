"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Reusable Button component
 *
 * Props:
 *  variant: "primary" | "secondary" | "ghost"
 *  size: "sm" | "md" | "lg"
 *  href: string  (renders as <Link> if provided)
 *  className: string
 *  children: ReactNode
 *  ...rest: passed to the underlying element
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...rest
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer select-none whitespace-nowrap";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm",
    ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
  };

  const classes = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  ].join(" ");

  const motionProps = {
    whileHover: { scale: variant === "primary" ? 1.015 : 1.01 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}
