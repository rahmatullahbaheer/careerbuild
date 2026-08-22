import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.vercel.app";

// ── Top-Ranking SEO Metadata ──────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "CareerBuild — #1 Free AI Resume Builder | ATS-Friendly CV Maker & Templates",
    template: "%s | CareerBuild Resume Builder",
  },

  description:
    "Build a job-winning, ATS-friendly resume in under 10 minutes with CareerBuild. Choose from 100+ professional templates, AI-powered bullet suggestions, and download print-ready PDF resumes for free.",

  applicationName: "CareerBuild",
  authors: [{ name: "CareerBuild Team", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "resume builder",
    "free resume builder",
    "AI resume builder",
    "ATS resume builder",
    "online CV maker",
    "professional resume templates",
    "free resume builder PDF download",
    "ATS friendly resume builder",
    "create resume online free",
    "best resume maker 2026",
    "software engineer resume template",
    "executive CV builder",
    "AI CV writer",
    "job application resume creator",
    "ATS resume scanner",
  ],
  referrer: "origin-when-cross-origin",
  creator: "CareerBuild",
  publisher: "CareerBuild Inc.",
  category: "technology",
  classification: "Career & Business Tools",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "CareerBuild Resume Builder",
    title: "CareerBuild — #1 Free AI Resume Builder | ATS-Friendly CV Maker & Templates",
    description:
      "Create professional, ATS-optimized resumes in minutes. 100+ templates, AI writing assistant, real-time preview, and free PDF download.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerBuild — AI Resume Builder and ATS CV Templates",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@careerbuild",
    creator: "@careerbuild",
    title: "CareerBuild — #1 Free AI Resume Builder & ATS CV Maker",
    description:
      "Create professional, ATS-friendly resumes in minutes with AI. 100+ modern templates and instant PDF export.",
    images: ["/og-image.png"],
  },

  verification: {
    google: "google-site-verification-token",
    yandex: "yandex-verification-token",
  },
};

export const viewport = {
  themeColor: "#1e3a8a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Google Rich Snippets & Schema.org JSON-LD ──────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#webapp`,
      name: "CareerBuild",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All Web Browsers (Chrome, Safari, Firefox, Edge, iOS, Android)",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "Top-rated online AI resume builder that helps job seekers create professional, ATS-compliant resumes and cover letters in minutes with intelligent suggestions and recruiter-approved templates.",
      image: `${SITE_URL}/og-image.png`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "12480",
        bestRating: "5",
        worstRating: "1",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Core resume builder with professional ATS templates and free PDF download.",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "9.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          description: "Unlimited AI bullet suggestions, 100+ premium templates, and unlimited resumes.",
        },
      ],
      featureList: [
        "100+ ATS-Compliant Resume Templates",
        "AI Bullet Point & Summary Enhancer",
        "Real-Time Interactive Preview",
        "Instant PDF Export",
        "ATS Score & Keyword Optimization",
        "Multiple Industry Formats (Engineering, Design, Executive, Corporate)",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CareerBuild",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        "CareerBuild provides AI-powered resume and career document tools helping thousands of professionals land interviews at top companies.",
      sameAs: [
        "https://twitter.com/careerbuild",
        "https://linkedin.com/company/careerbuild",
        "https://github.com/careerbuild",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "support@careerbuild.app",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "CareerBuild",
      description: "Build a professional, ATS-friendly resume online in minutes.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/templates?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Resume Templates",
          item: `${SITE_URL}/#templates`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Pricing",
          item: `${SITE_URL}/#pricing`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is CareerBuild?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CareerBuild is the #1 online AI resume builder that helps you create professional, ATS-friendly resumes quickly with expert templates, real-time live preview, and AI-powered suggestions.",
          },
        },
        {
          "@type": "Question",
          name: "Can I create a resume for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! CareerBuild offers a completely free plan that includes access to core templates, full resume builder tools, real-time live preview, and instant PDF download.",
          },
        },
        {
          "@type": "Question",
          name: "Are CareerBuild resumes ATS-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All CareerBuild templates are engineered with clean typography, standard section headers, and semantic structure proven to pass major Applicant Tracking Systems (ATS) like Workday, Greenhouse, and Lever.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download my resume as a PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you can export and download your resume in high-resolution, print-ready, and ATS-scannable PDF format with a single click.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI Resume Writer help?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CareerBuild AI helps you transform basic job descriptions into powerful, quantifiable achievements and action-driven bullet points tailored to your target job title.",
          },
        },
      ],
    },
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────

import { UserProvider } from "@/context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
