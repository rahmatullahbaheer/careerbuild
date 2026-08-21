"use client";

import React, { useState } from "react";
import { Plus, Search, FileText, Eye, Edit3, Trash2, Download, CheckCircle2 } from "lucide-react";

export default function MyResumesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Senior Fullstack Developer Resume",
      subtitle: "Software Engineering • Updated 2 days ago",
      atsScore: 95,
      category: "passed",
      downloads: 14,
    },
    {
      id: 2,
      title: "Tech Lead & Cloud Architect",
      subtitle: "Cloud & Distributed Systems • Updated 4 days ago",
      atsScore: 92,
      category: "passed",
      downloads: 8,
    },
    {
      id: 3,
      title: "Frontend React Specialist",
      subtitle: "UI/UX & Web Performance • Draft",
      atsScore: 84,
      category: "draft",
      downloads: 2,
    },
    {
      id: 4,
      title: "Product Manager & Strategy Resume",
      subtitle: "Product Leadership • Updated 1 week ago",
      atsScore: 88,
      category: "passed",
      downloads: 19,
    },
    {
      id: 5,
      title: "DevOps & Infrastructure Lead",
      subtitle: "Kubernetes & CI/CD • Updated 2 weeks ago",
      atsScore: 90,
      category: "passed",
      downloads: 11,
    },
    {
      id: 6,
      title: "AI Engineer Resume Draft",
      subtitle: "Python & Machine Learning • Draft",
      atsScore: 78,
      category: "draft",
      downloads: 0,
    },
  ]);

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    return matchesSearch && r.category === filter;
  });

  const handleDelete = (id, title) => {
    if (confirm(`Delete resume "${title}"?`)) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            My Resumes Library
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Manage, edit, and optimize your saved resume documents.
          </p>
        </div>

        <button
          onClick={() => alert("Create New Resume")}
          className="py-2.5 px-4 rounded-full bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Resume</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100/80 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resumes..."
            className="w-full h-9 pl-9 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#064e3b]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Resumes" },
            { id: "passed", label: "ATS Passed" },
            { id: "draft", label: "Drafts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.id
                  ? "bg-[#064e3b] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResumes.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Card Top */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#064e3b] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.atsScore >= 90
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  ATS {item.atsScore}%
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-[#064e3b] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-gray-400" />
                {item.downloads} Downloads
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Edit ${item.title}`)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all"
                  title="Edit Resume"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => alert(`Previewing ${item.title}`)}
                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#064e3b] font-bold transition-all"
                  title="Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
