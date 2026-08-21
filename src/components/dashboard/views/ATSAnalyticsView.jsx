"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Search, FileCheck, ShieldCheck, Zap } from "lucide-react";

export default function ATSAnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          ATS Score & Keyword Scanner
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Scan your resume against ATS engines (Greenhouse, Workday, Lever) to fix parser issues.
        </p>
      </div>

      {/* Top Score Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#064e3b] to-[#04392b] text-white p-6 rounded-3xl shadow-md space-y-2">
          <span className="text-xs text-emerald-200 font-bold uppercase tracking-wider">
            Overall ATS Score
          </span>
          <div className="text-4xl font-extrabold font-mono">92 / 100</div>
          <p className="text-xs text-emerald-100/80">
            High compatibility. Your resume passes 9 out of 10 automated screeners.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-2xs space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Keyword Density Match
          </span>
          <div className="text-4xl font-extrabold text-emerald-600 font-mono">95%</div>
          <p className="text-xs text-gray-500">
            Contains 28 out of 30 industry action keywords.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-2xs space-y-2">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Formatting & Parsing
          </span>
          <div className="text-4xl font-extrabold text-emerald-600 font-mono">100%</div>
          <p className="text-xs text-gray-500">
            Zero tables, images, or unreadable fonts detected.
          </p>
        </div>
      </div>

      {/* Detailed Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Passed Checks */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Passed ATS Criteria (8 Checks)</span>
          </div>

          <div className="space-y-2 text-xs text-gray-700">
            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <span>Standard Section Headers (Experience, Education)</span>
              <span className="font-bold text-emerald-700">PASSED</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <span>Single Column Clean Layout</span>
              <span className="font-bold text-emerald-700">PASSED</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <span>Measurable Action Bullet Points</span>
              <span className="font-bold text-emerald-700">PASSED</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <span>Contact Details & LinkedIn URL</span>
              <span className="font-bold text-emerald-700">PASSED</span>
            </div>
          </div>
        </div>

        {/* Suggested Improvements */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Optimization Suggestions (2 Items)</span>
          </div>

          <div className="space-y-2 text-xs text-gray-700">
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
              <span>Add "Kubernetes & CI/CD" in Skills section</span>
              <button
                onClick={() => alert("Auto-applied keyword to resume")}
                className="px-2 py-1 rounded bg-amber-600 text-white text-[10px] font-bold"
              >
                Auto Fix
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-between">
              <span>Include metrics for "Led Team of 6 Engineers"</span>
              <button
                onClick={() => alert("Auto-applied suggestion")}
                className="px-2 py-1 rounded bg-amber-600 text-white text-[10px] font-bold"
              >
                Auto Fix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
