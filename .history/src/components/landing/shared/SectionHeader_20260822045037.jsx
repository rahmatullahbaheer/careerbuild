/**
 * SectionHeader — Server Component
 * Reusable section title + optional subtitle
 *
 * Props:
 *  eyebrow: string  (small label above heading)
 *  heading: string | ReactNode
 *  subheading: string | ReactNode
 *  align: "left" | "center" (default "center")
 *  className: string
 */
export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "center",
  className = "",
}) {
  const alignClass = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}
