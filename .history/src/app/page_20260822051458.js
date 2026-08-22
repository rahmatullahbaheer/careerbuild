// Landing page — Server Component (no "use client")
// All interactive sub-components handle their own "use client" directive.
// This file remains a Server Component for optimal performance and SEO.

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStats from "@/components/landing/TrustStats";
import Features from "@/components/landing/Features";
import ProductPreview from "@/components/landing/ProductPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import Templates from "@/components/landing/Templates";
import AIResumeSection from "@/components/landing/AIResumeSection";
import ATSSection from "@/components/landing/ATSSection";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero — above the fold */}
        <Hero />

        {/* 2. Trust / social proof */}
        <TrustStats />

        {/* 3. Features */}
        <Features />

        {/* 4. Product preview */}
        <ProductPreview />

        {/* 5. How it works */}
        <HowItWorks />

        {/* 6. Resume templates */}
        <Templates />

        {/* 7. AI section */}
        <AIResumeSection />

        {/* 8. ATS compatibility */}
        <ATSSection />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Pricing */}
        <Pricing />

        {/* 11. FAQ */}
        <FAQ />

        {/* 12. Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
