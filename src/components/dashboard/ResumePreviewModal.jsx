"use client";

import React from "react";
import { X, Download, FileText, CheckCircle, Sparkles, Printer } from "lucide-react";
import { exportResumeToPDF } from "@/lib/pdfExporter";

export default function ResumePreviewModal({
  isOpen,
  onClose,
  resumeData,
  activeTemplate,
  children,
}) {
  if (!isOpen) return null;

  const handleDownload = () => {
    exportResumeToPDF("preview-modal-canvas", `${resumeData.name || "Resume"}_CV`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-slate-900 w-full max-w-5xl h-[94vh] rounded-3xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER WITH DOWNLOAD BUTTON (as requested in handwritten sketch) */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {resumeData.title || "Resume Preview"}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeTemplate?.name || "Standard Layout"}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Live formatted document preview • Ready for export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* TOP ONE BUTTON FOR DOWNLOAD */}
            <button
              onClick={handleDownload}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer active:scale-95 border border-emerald-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DOCUMENT CANVAS CONTAINER */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex justify-center">
          <div
            id="preview-modal-canvas"
            className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-2xl rounded-xl p-8 sm:p-10 border border-slate-200"
          >
            {children}
          </div>
        </div>

        {/* FOOTER ACTION BAR */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            A4 Portrait Layout Ready • 100% Vector Quality
          </span>

          <button
            onClick={handleDownload}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Direct Print Document
          </button>
        </div>
      </div>
    </div>
  );
}
