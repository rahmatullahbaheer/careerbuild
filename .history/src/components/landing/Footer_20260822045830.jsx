import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Resume Builder", href: "/dashboard" },
    { label: "Templates", href: "#templates" },
    { label: "AI Resume Writer", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
  ],
  Resources: [
    { label: "Resume Examples", href: "#" },
    { label: "Career Guide", href: "#" },
    { label: "Resume Tips", href: "#" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg"
              aria-label="CareerBuild — go to homepage"
            >
              <div
                className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="6" height="8" rx="1.2" fill="white" opacity="0.9" />
                  <rect x="10" y="2" width="6" height="5" rx="1.2" fill="white" opacity="0.6" />
                  <rect x="2" y="12" width="14" height="2" rx="1" fill="white" opacity="0.7" />
                  <rect x="2" y="15.5" width="9" height="1.5" rx="0.75" fill="white" opacity="0.5" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">CareerBuild</span>
            </Link>

            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xs">
              Build better resumes. Build your future. Create a professional,
              ATS-friendly resume in minutes.
            </p>

            {/* Social links placeholder */}
            <div className="flex items-center gap-3 mt-6" aria-label="Social media links">
              {[
                { label: "Twitter/X", icon: "𝕏" },
                { label: "LinkedIn", icon: "in" },
                { label: "GitHub", icon: "gh" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={`CareerBuild on ${social.label}`}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700/50 flex items-center justify-center text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([column, links]) => (
            <nav key={column} aria-label={`${column} links`}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-4">
                {column}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {currentYear} CareerBuild. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
