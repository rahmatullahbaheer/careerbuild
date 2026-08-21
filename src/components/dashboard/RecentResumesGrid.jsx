"use client";

import React, { useState } from "react";
import { FileText, Eye, Trash2, Calendar, Sparkles, X, Clock } from "lucide-react";

export default function RecentResumesGrid() {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Senior Fullstack Developer Resume",
      subtitle: "Software Engineering • 3 Pages",
      createdDate: "Created: Aug 20, 2026",
      status: "ATS Score: 95%",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: 2,
      title: "Tech Lead & Architect Resume",
      subtitle: "Cloud & Distributed Systems • 2 Pages",
      createdDate: "Created: Aug 18, 2026",
      status: "ATS Score: 92%",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: 3,
      title: "Frontend React Specialist Cover Letter",
      subtitle: "Cover Letter • 1 Page",
      createdDate: "Created: Aug 15, 2026",
      status: "Verified",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: 4,
      title: "Product Manager & Strategy CV",
      subtitle: "Product Leadership • 2 Pages",
      createdDate: "Created: Aug 10, 2026",
      status: "ATS Score: 88%",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ]);

  const [previewModal, setPreviewModal] = useState(null);

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setResumes((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#064e3b]" />
          <h3 className="text-sm font-bold text-gray-900 tracking-wide">
            Recent Resumes & Cover Letters
          </h3>
        </div>
        <span className="text-xs font-semibold text-gray-400">
          {resumes.length} Documents Saved
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/70 hover:border-gray-300 hover:bg-gray-50 transition-all flex flex-col justify-between space-y-3 group"
          >
            {/* Card Top Row */}
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-extrabold text-gray-900 leading-snug group-hover:text-[#064e3b] transition-colors">
                  {item.title}
                </h4>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor} flex-shrink-0`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500">
                {item.subtitle}
              </p>
            </div>

            {/* Card Footer: Date + Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400 font-medium text-[11px]">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{item.createdDate}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Button */}
                <button
                  type="button"
                  onClick={() => setPreviewModal(item)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 font-bold text-xs transition-all shadow-2xs flex items-center gap-1.5 active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>View</span>
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-600 font-bold transition-all shadow-2xs active:scale-95"
                  title="Delete Resume"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-tight">
                    {previewModal.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">
                    {previewModal.subtitle}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Details Body */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200/60 text-xs">
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Creation Date:</span>
                <span>{previewModal.createdDate}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">ATS Compatibility:</span>
                <span className="font-bold text-emerald-700">{previewModal.status}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="font-semibold">Format:</span>
                <span>PDF & DOCX Export Ready</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewModal(null)}
                className="py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Opening editor for ${previewModal.title}...`)}
                className="py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs transition-all shadow-xs"
              >
                Edit Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
