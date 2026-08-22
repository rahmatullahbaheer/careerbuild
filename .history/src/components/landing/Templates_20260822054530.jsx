"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import AnimatedSection, { fadeUp } from "./shared/AnimatedSection";
import SectionHeader from "./shared/SectionHeader";

const allTemplates = [
  {
    id: 1,
    name: "Executive Modern",
    category: "Executive",
    role: "Senior & Leadership",
    accentColor: "#1e3a8a",
    headerBg: "bg-gradient-to-r from-slate-900 to-blue-950",
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    popular: true,
  },
  {
    id: 2,
    name: "Tech Lead Minimal",
    category: "Modern",
    role: "Engineering & IT",
    accentColor: "#2563eb",
    headerBg: "bg-gradient-to-r from-blue-700 to-indigo-800",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-100",
    popular: false,
  },
  {
    id: 3,
    name: "ATS Shield Pro",
    category: "ATS-Friendly",
    role: "Corporate & Finance",
    accentColor: "#059669",
    headerBg: "bg-gradient-to-r from-emerald-800 to-teal-900",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    popular: true,
  },
  {
    id: 4,
    name: "Creative Studio",
    category: "Creative",
    role: "Design & UX/UI",
    accentColor: "#7c3aed",
    headerBg: "bg-gradient-to-r from-indigo-700 to-purple-800",
    badge: "bg-purple-50 text-purple-700 border border-purple-100",
    popular: false,
  },
  {
    id: 5,
    name: "Minimal Edge",
    category: "Minimal",
    role: "Product & Strategy",
    accentColor: "#0f172a",
    headerBg: "bg-gradient-to-r from-zinc-900 to-slate-800",
    badge: "bg-zinc-100 text-zinc-800 border border-zinc-200",
    popular: false,
  },
  {
    id: 6,
    name: "Corporate Classic",
    category: "Professional",
    role: "Management & Sales",
    accentColor: "#0284c7",
    headerBg: "bg-gradient-to-r from-sky-800 to-blue-900",
    badge: "bg-sky-50 text-sky-700 border border-sky-100",
    popular: false,
  },
  {
    id: 7,
    name: "Academic Researcher",
    category: "Professional",
    role: "Education & Science",
    accentColor: "#047857",
    headerBg: "bg-gradient-to-r from-emerald-900 to-slate-900",
    badge: "bg-teal-50 text-teal-700 border border-teal-100",
    popular: false,
  },
  {
    id: 8,
    name: "Compact Developer",
    category: "Modern",
    role: "Software Development",
    accentColor: "#3b82f6",
    headerBg: "bg-gradient-to-r from-blue-800 to-cyan-900",
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    popular: true,
  },
];

const categories = [
  "All",
  "Modern",
  "Executive",
  "ATS-Friendly",
  "Minimal",
  "Creative",
  "Professional",
];

function TemplateMockup({ template }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-zinc-200/90 shadow-sm w-full aspect-[3/4] flex flex-col select-none"
      aria-hidden="true"
    >
      {/* Template header */}
      <div
        className={`${template.headerBg} px-3.5 py-3.5 flex-shrink-0 text-white`}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex-shrink-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-2 bg-white/90 rounded-full w-20 mb-1.5" />
            <div className="h-1.5 bg-white/50 rounded-full w-14" />
          </div>
        </div>
        <div className="flex gap-2 pt-1 border-t border-white/10">
          <div className="h-1.5 bg-white/40 rounded-full w-10" />
          <div className="h-1.5 bg-white/40 rounded-full w-14" />
          <div className="h-1.5 bg-white/40 rounded-full w-12" />
        </div>
      </div>

      {/* Template body */}
      <div className="flex-1 p-3.5 space-y-3 bg-zinc-50/50">
        <div>
          <div
            className="h-1.5 rounded-full w-16 mb-1.5"
            style={{ backgroundColor: template.accentColor }}
          />
          <div className="space-y-1">
            <div className="h-1.5 bg-zinc-200 rounded-full w-full" />
            <div className="h-1.5 bg-zinc-200 rounded-full w-4/5" />
          </div>
        </div>

        <div>
          <div
            className="h-1.5 rounded-full w-20 mb-1.5"
            style={{ backgroundColor: template.accentColor }}
          />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <div className="h-1.5 bg-zinc-400 rounded-full w-24" />
              <div className="h-1.5 bg-zinc-300 rounded-full w-12" />
            </div>
            <div className="h-1 bg-zinc-200 rounded-full w-full" />
            <div className="h-1 bg-zinc-200 rounded-full w-5/6" />
          </div>
        </div>

        <div>
          <div
            className="h-1.5 rounded-full w-12 mb-1.5"
            style={{ backgroundColor: template.accentColor }}
          />
          <div className="flex flex-wrap gap-1">
            {[14, 18, 12, 16].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded-md"
                style={{
                  width: `${w * 3.5}px`,
                  backgroundColor: template.accentColor + "1a",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateSlideCard({ template }) {
  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl p-2.5 border border-zinc-200/80 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300">
      {/* Popular badge */}
      {template.popular && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold tracking-wider bg-blue-600 text-white rounded-full shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            Popular
          </span>
        </div>
      )}

      {/* Mockup with hover overlay */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-200/80 group-hover:border-blue-200 transition-colors">
        <TemplateMockup template={template} />

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-4">
          <a
            href="/dashboard"
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-transform transform translate-y-2 group-hover:translate-y-0 duration-200 text-center w-full max-w-[140px]"
            aria-label={`Use ${template.name} template`}
          >
            Use Template
          </a>
          <a
            href="/dashboard"
            className="px-4 py-2 text-xs font-medium text-white/90 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg transition-transform transform translate-y-2 group-hover:translate-y-0 duration-200 delay-75 text-center w-full max-w-[140px]"
            aria-label={`Preview ${template.name} template`}
          >
            Preview
          </a>
        </div>
      </div>

      {/* Template info */}
      <div className="mt-3 px-1 pb-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors truncate">
            {template.name}
          </h3>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${template.badge} flex-shrink-0`}
          >
            {template.category}
          </span>
        </div>
        <p className="text-xs text-zinc-400 truncate">{template.role}</p>
      </div>
    </article>
  );
}

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const swiperRef = useRef(null);

  const filteredTemplates =
    selectedCategory === "All"
      ? allTemplates
      : allTemplates.filter((t) => t.category === selectedCategory);

  return (
    <section
      id="templates"
      className="py-12 sm:py-16 lg:py-18 bg-zinc-50/70 border-y border-zinc-200/60 relative overflow-hidden"
      aria-labelledby="templates-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection variants={fadeUp} className="text-center mb-6 sm:mb-8">
          <SectionHeader
            eyebrow="Resume Templates"
            heading={
              <>
                Professional Templates{" "}
                <span className="gradient-text">for Every Career</span>
              </>
            }
            subheading="Browse our curated collection of ATS-optimized and recruiter-approved templates. Swipe to explore styles for your industry."
            id="templates-heading"
          />
        </AnimatedSection>

        {/* Category Filter Tabs & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none"
            role="tablist"
            aria-label="Filter templates by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous template slide"
              className="w-9 h-9 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next template slide"
              className="w-9 h-9 rounded-full bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-blue-600 hover:bg-blue-50/50 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative -mx-2 px-2 pb-6">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={filteredTemplates.length > 3}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              480: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="templates-swiper !pb-12"
          >
            {filteredTemplates.map((template) => (
              <SwiperSlide key={template.id} className="h-auto">
                <TemplateSlideCard template={template} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection variants={fadeUp} className="text-center mt-6">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md px-3 py-1.5"
          >
            Browse all 100+ templates in dashboard
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 7h8M8 3.5l3.5 3.5L8 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
