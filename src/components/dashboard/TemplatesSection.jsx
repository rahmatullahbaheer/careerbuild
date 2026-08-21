"use client";

import React from "react";
import { Sparkles, Eye, Star } from "lucide-react";

export default function TemplatesSection() {
  const templates = [
    {
      id: 1,
      title: "Executive Modern",
      category: "Senior & Leadership",
      uses: "14.2k uses",
      rating: "4.9",
      bgGradient: "from-emerald-600 to-teal-800",
    },
    {
      id: 2,
      title: "Tech Lead Minimal",
      category: "Engineering & IT",
      uses: "22.8k uses",
      rating: "5.0",
      bgGradient: "from-blue-600 to-indigo-800",
    },
    {
      id: 3,
      title: "ATS Professional",
      category: "Corporate & Finance",
      uses: "18.5k uses",
      rating: "4.8",
      bgGradient: "from-slate-700 to-slate-900",
    },
    {
      id: 4,
      title: "Creative Portfolio CV",
      category: "Design & UX/UI",
      uses: "12.1k uses",
      rating: "4.9",
      bgGradient: "from-purple-600 to-pink-700",
    },
    {
      id: 5,
      title: "Clean One-Pager",
      category: "Product & Marketing",
      uses: "16.4k uses",
      rating: "4.7",
      bgGradient: "from-emerald-700 to-[#064e3b]",
    },
    {
      id: 6,
      title: "Startup Founder CV",
      category: "Entrepreneurship",
      uses: "9.8k uses",
      rating: "4.9",
      bgGradient: "from-amber-600 to-orange-700",
    },
    {
      id: 7,
      title: "Global Corporate",
      category: "Management & Sales",
      uses: "11.3k uses",
      rating: "4.8",
      bgGradient: "from-cyan-700 to-blue-900",
    },
    {
      id: 8,
      title: "Academic & Research",
      category: "Education & Science",
      uses: "7.6k uses",
      rating: "4.9",
      bgGradient: "from-[#04392b] to-emerald-950",
    },
    {
      id: 9,
      title: "Compact Developer",
      category: "Software Development",
      uses: "25.1k uses",
      rating: "5.0",
      bgGradient: "from-[#064e3b] to-teal-900",
    },
    {
      id: 10,
      title: "Elegance Cover Letter",
      category: "Cover Page & Intro",
      uses: "19.3k uses",
      rating: "4.9",
      bgGradient: "from-rose-600 to-red-800",
    },
  ];

  // Duplicate list to achieve continuous infinite marquee loop
  const doubleTemplates = [...templates, ...templates];

  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 shadow-2xs space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#064e3b]" />
          <h3 className="text-sm font-bold text-gray-900 tracking-wide">
            Featured Resume Templates (10 Templates)
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
          Auto Right-Scrolling Marquee
        </span>
      </div>

      {/* Auto Right-Scrolling Track */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="animate-marquee-right gap-4">
          {doubleTemplates.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[200px] flex-shrink-0 bg-gray-50 border border-gray-200/70 rounded-2xl p-3 space-y-3 hover:shadow-md hover:scale-[1.02] transition-all group"
            >
              {/* Template Graphic Preview */}
              <div
                className={`w-full h-24 rounded-xl bg-gradient-to-br ${item.bgGradient} p-3 flex flex-col justify-between text-white relative overflow-hidden`}
              >
                <div className="flex items-center justify-between text-[9px] font-bold opacity-80">
                  <span>ATS READY</span>
                  <div className="flex items-center gap-0.5 text-amber-300">
                    <Star className="w-2.5 h-2.5 fill-amber-300 stroke-none" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Abstract document lines preview */}
                <div className="space-y-1 my-auto opacity-70">
                  <div className="w-12 h-1.5 bg-white rounded-full"></div>
                  <div className="w-20 h-1 bg-white/70 rounded-full"></div>
                  <div className="w-16 h-1 bg-white/70 rounded-full"></div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Selected template: ${item.title}`)}
                  className="w-full py-1 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-xs text-[10px] font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Use Template
                </button>
              </div>

              {/* Info Details */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span className="truncate">{item.category}</span>
                  <span className="text-emerald-700 font-bold flex-shrink-0">
                    {item.uses}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
