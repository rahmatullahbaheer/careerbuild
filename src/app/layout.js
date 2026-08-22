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

// ── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.app"),

  title: {
    default: "CareerBuild — Professional Resume Builder | Create an ATS-Friendly Resume",
    template: "%s | CareerBuild",
  },

  description:
    "Build a professional, ATS-friendly resume in minutes with CareerBuild. Choose a modern template, customize your resume, and create a job-ready CV online. Free to start.",

  keywords: [
    "resume builder",
    "online resume builder",
    "professional resume builder",
    "CV builder",
    "free resume builder",
    "ATS friendly resume builder",
    "create a resume online",
    "professional CV maker",
    "AI resume builder",
    "resume templates",
  ],

  authors: [{ name: "CareerBuild" }],
  creator: "CareerBuild",
  publisher: "CareerBuild",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CareerBuild",
    title: "CareerBuild — Professional Resume Builder | Create an ATS-Friendly Resume",
    description:
      "Build a professional, ATS-friendly resume in minutes with CareerBuild. Choose a modern template, customize your resume, and create a job-ready CV online.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerBuild — Professional Resume Builder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CareerBuild — Professional Resume Builder",
    description:
      "Build a professional, ATS-friendly resume in minutes. Choose a modern template and create a job-ready CV online.",
    images: ["/og-image.png"],
    creator: "@careerbuild",
  },

  alternates: {
    canonical: "/",
  },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://careerbuild.app/#webapp",
      name: "CareerBuild",
      url: "https://careerbuild.app",
      description:
        "An online resume builder that helps you create professional, ATS-friendly resumes with AI-powered suggestions and professionally designed templates.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          description: "Basic resume builder with core templates.",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          description: "Premium templates, AI suggestions, and unlimited resumes.",
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://careerbuild.app/#organization",
      name: "CareerBuild",
      url: "https://careerbuild.app",
      description: "Professional resume builder helping job seekers create ATS-friendly resumes.",
    },
    {
      "@type": "WebSite",
      "@id": "https://careerbuild.app/#website",
      url: "https://careerbuild.app",
      name: "CareerBuild",
      description: "Build a professional, ATS-friendly resume online.",
      publisher: {
        "@id": "https://careerbuild.app/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://careerbuild.app/templates?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://careerbuild.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is CareerBuild?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CareerBuild is an online resume builder that helps you create professional, ATS-friendly resumes quickly with templates, a guided editor, real-time preview, and AI-powered suggestions.",
          },
        },
        {
          "@type": "Question",
          name: "Can I create a resume for free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! CareerBuild offers a free plan that includes access to core templates, the resume builder, real-time preview, and PDF download.",
          },
        },
        {
          "@type": "Question",
          name: "Are CareerBuild resumes ATS-friendly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CareerBuild templates are designed with clean structure, standard section headings, and proper formatting that many ATS platforms can parse effectively. While we follow industry best practices, ATS compatibility can vary across systems.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download my resume as a PDF?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Both the free and Pro plans include PDF download.",
          },
        },
        {
          "@type": "Question",
          name: "Can AI help improve my resume?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Pro subscribers get access to AI-powered suggestions for experience bullets, professional summaries, skills sections, and achievement statements.",
          },
        },
      ],
    },
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────

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
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
