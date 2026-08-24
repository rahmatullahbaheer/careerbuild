"use client";

import React from "react";
import { X, Check, Sparkles, Layout, Palette, ShieldCheck } from "lucide-react";

export const RESUME_TEMPLATES = [
  {
    id: "nodejs-modern",
    name: "Node.js & Tech Modern",
    category: "Engineering",
    description: "Sleek sidebar accent, highlight tags for MERN stack, ATS compliant structure.",
    accentColor: "bg-emerald-600",
    themeHeader: "bg-gradient-to-r from-emerald-800 to-teal-900 text-white",
    borderAccent: "border-emerald-500",
    badge: "Most Popular",
    rating: "4.9",
  },
  {
    id: "executive-pro",
    name: "Executive Leadership",
    category: "Management",
    description: "Classic top banner header with elegant double-column format for senior positions.",
    accentColor: "bg-blue-600",
    themeHeader: "bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white",
    borderAccent: "border-blue-500",
    badge: "Recommended",
    rating: "5.0",
  },
  {
    id: "ats-[#064e3b]",
    name: "ATS High-Score Standard",
    category: "ATS Optimized",
    description: "Clean single-column monochrome design optimized for resume parser algorithms.",
    accentColor: "bg-gray-800",
    themeHeader: "bg-gray-900 text-white",
    borderAccent: "border-gray-700",
    badge: "99% ATS Pass",
    rating: "4.8",
  },
  {
    id: "creative-dev",
    name: "Creative Developer Portfolio",
    category: "Design & Frontend",
    description: "Vibrant accents, pill badges for skills, social link callouts, and project cards.",
    accentColor: "bg-purple-600",
    themeHeader: "bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-800 text-white",
    borderAccent: "border-purple-500",
    badge: "Creative",
    rating: "4.9",
  },
  {
    id: "minimalist-clean",
    name: "Minimalist Clean CV",
    category: "Minimalist",
    description: "High readability typography, generous white space, subtle border accents.",
    accentColor: "bg-teal-600",
    themeHeader: "bg-[#064e3b] text-white",
    borderAccent: "border-teal-600",
    badge: "Clean",
    rating: "4.7",
  },
];

export default function ResumeTemplateModal({
  isOpen,
  onClose,
  selectedTemplateId,
  onSelectTemplate,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#064e3b] to-teal-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Select Resume Template
              </h2>
              <p className="text-xs text-emerald-200/80 font-medium">
                Choose a design layout. All content dynamically updates instantly!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close template popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid Container */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-50/50">
          {RESUME_TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  onClose();
                }}
                className={`group relative bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-xl ${
                  isSelected
                    ? "border-[#064e3b] ring-4 ring-[#064e3b]/10 bg-emerald-50/20"
                    : "border-gray-200/80 hover:border-emerald-300"
                }`}
              >
                {/* Badge Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-[#064e3b]">
                    {tmpl.category}
                  </span>
                  {tmpl.badge && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-600" />
                      {tmpl.badge}
                    </span>
                  )}
                </div>

                {/* Template Visual Miniature Preview */}
                <div
                  className={`w-full h-36 rounded-xl ${tmpl.themeHeader} p-3 flex flex-col justify-between relative overflow-hidden shadow-inner mb-4 transition-transform group-hover:scale-[1.02]`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 border border-white/30" />
                    <div className="space-y-1">
                      <div className="w-16 h-2 bg-white/90 rounded-full" />
                      <div className="w-10 h-1.5 bg-white/60 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5 opacity-80">
                    <div className="w-full h-1.5 bg-white/40 rounded-full" />
                    <div className="w-3/4 h-1.5 bg-white/40 rounded-full" />
                    <div className="w-5/6 h-1.5 bg-white/40 rounded-full" />
                  </div>

                  {isSelected && (
                    <div className="absolute inset-0 bg-[#064e3b]/80 backdrop-blur-xs flex items-center justify-center text-white font-bold gap-2 text-sm">
                      <Check className="w-5 h-5 text-emerald-300 stroke-[3]" />
                      <span>Active Template</span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#064e3b] transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#064e3b] text-white"
                      : "bg-gray-100 hover:bg-[#064e3b] text-gray-700 hover:text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" /> Selected
                    </>
                  ) : (
                    "Apply Template"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Tip: You can switch templates anytime without losing your edited content.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
