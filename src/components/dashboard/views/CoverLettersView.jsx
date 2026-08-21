"use client";

import React, { useState } from "react";
import { Plus, BookOpen, Edit3, Eye, Copy, Trash2, Sparkles } from "lucide-react";

export default function CoverLettersView() {
  const [letters, setLetters] = useState([
    {
      id: 1,
      title: "Tech Lead Cover Letter",
      company: "Google / Arc Company",
      date: "Created: Nov 28, 2024",
      status: "Tailored",
    },
    {
      id: 2,
      title: "Senior Fullstack Engineer Intro",
      company: "Microsoft & Meta Applications",
      date: "Created: Nov 20, 2024",
      status: "Verified",
    },
    {
      id: 3,
      title: "Product Manager Cover Page",
      company: "Stripe & Coinbase",
      date: "Created: Nov 15, 2024",
      status: "Draft",
    },
    {
      id: 4,
      title: "DevOps Lead Application Letter",
      company: "Amazon Web Services",
      date: "Created: Nov 05, 2024",
      status: "Tailored",
    },
  ]);

  const handleDelete = (id, title) => {
    if (confirm(`Delete cover letter "${title}"?`)) {
      setLetters((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Cover Letters & Pages
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Create personalized, impact-driven cover letters matched for job applications.
          </p>
        </div>

        <button
          onClick={() => alert("Create New Cover Letter")}
          className="py-2.5 px-4 rounded-full bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Cover Letter</span>
        </button>
      </div>

      {/* Quick Template Selector */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#064e3b] to-teal-900 text-white p-6 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>AI Cover Letter Generator</span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Generate a tailored cover letter in under 30 seconds
        </h2>
        <p className="text-xs text-emerald-100/80 max-w-xl">
          Paste your target job description and choose a template to automatically format a professional cover letter.
        </p>
        <button
          onClick={() => alert("AI Cover Letter Generator Opened")}
          className="mt-2 py-2 px-4 rounded-xl bg-white text-[#064e3b] hover:bg-emerald-50 font-bold text-xs shadow-xs transition-all"
        >
          Generate with AI
        </button>
      </div>

      {/* Saved Cover Letters List */}
      <div className="bg-white border border-gray-100/80 rounded-2xl p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900">Saved Cover Letters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {letters.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/70 hover:border-gray-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{item.company}</p>
                <p className="text-[10px] text-gray-400">{item.date}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/50">
                <button
                  onClick={() => alert(`Duplicating ${item.title}`)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={() => alert(`Editing ${item.title}`)}
                  className="px-2.5 py-1 rounded-lg bg-[#064e3b] text-xs font-bold text-white hover:bg-[#04392b] flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
