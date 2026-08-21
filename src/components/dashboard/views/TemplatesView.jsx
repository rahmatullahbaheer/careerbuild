"use client";

import React, { useState } from "react";
import { Sparkles, Star, Search, Filter } from "lucide-react";

export default function TemplatesView() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      id: 1,
      title: "Executive Modern",
      category: "executive",
      label: "Senior & Leadership",
      uses: "14.2k uses",
      rating: "4.9",
      bgGradient: "from-emerald-600 to-teal-800",
    },
    {
      id: 2,
      title: "Tech Lead Minimal",
      category: "tech",
      label: "Engineering & IT",
      uses: "22.8k uses",
      rating: "5.0",
      bgGradient: "from-blue-600 to-indigo-800",
    },
    {
      id: 3,
      title: "ATS Professional",
      category: "ats",
      label: "Corporate & Finance",
      uses: "18.5k uses",
      rating: "4.8",
      bgGradient: "from-slate-700 to-slate-900",
    },
    {
      id: 4,
      title: "Creative Portfolio CV",
      category: "creative",
      label: "Design & UX/UI",
      uses: "12.1k uses",
      rating: "4.9",
      bgGradient: "from-purple-600 to-pink-700",
    },
    {
      id: 5,
      title: "Clean One-Pager",
      category: "executive",
      label: "Product & Marketing",
      uses: "16.4k uses",
      rating: "4.7",
      bgGradient: "from-emerald-700 to-[#064e3b]",
    },
    {
      id: 6,
      title: "Startup Founder CV",
      category: "creative",
      label: "Entrepreneurship",
      uses: "9.8k uses",
      rating: "4.9",
      bgGradient: "from-amber-600 to-orange-700",
    },
    {
      id: 7,
      title: "Global Corporate",
      category: "ats",
      label: "Management & Sales",
      uses: "11.3k uses",
      rating: "4.8",
      bgGradient: "from-cyan-700 to-blue-900",
    },
    {
      id: 8,
      title: "Academic & Research",
      category: "academic",
      label: "Education & Science",
      uses: "7.6k uses",
      rating: "4.9",
      bgGradient: "from-[#04392b] to-emerald-950",
    },
    {
      id: 9,
      title: "Compact Developer",
      category: "tech",
      label: "Software Development",
      uses: "25.1k uses",
      rating: "5.0",
      bgGradient: "from-[#064e3b] to-teal-900",
    },
  ];

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Template Gallery
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Choose from HR-vetted, ATS-ready resume and cover letter templates.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Templates" },
          { id: "tech", label: "Engineering & Tech" },
          { id: "executive", label: "Executive & Leadership" },
          { id: "ats", label: "ATS High-Score" },
          { id: "creative", label: "Creative & Design" },
          { id: "academic", label: "Academic & Science" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-[#064e3b] text-white shadow-xs"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
          >
            {/* Visual Header */}
            <div
              className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.bgGradient} p-3 flex flex-col justify-between text-white relative overflow-hidden`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                <span>ATS GUARANTEED</span>
                <div className="flex items-center gap-0.5 text-amber-300">
                  <Star className="w-3 h-3 fill-amber-300 stroke-none" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="space-y-1.5 my-auto opacity-75">
                <div className="w-16 h-2 bg-white rounded-full"></div>
                <div className="w-24 h-1.5 bg-white/70 rounded-full"></div>
                <div className="w-20 h-1.5 bg-white/70 rounded-full"></div>
              </div>

              <button
                onClick={() => alert(`Selected template: ${item.title}`)}
                className="w-full py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold text-center transition-all opacity-90 group-hover:opacity-100"
              >
                Use Template
              </button>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-400 font-medium mt-1">
                <span>{item.label}</span>
                <span className="text-emerald-700 font-bold">{item.uses}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
