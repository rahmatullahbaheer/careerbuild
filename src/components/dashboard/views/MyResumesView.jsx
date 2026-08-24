"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  FileText,
  Eye,
  Edit3,
  Trash2,
  Download,
  Sparkles,
  Layout,
  CheckCircle2,
  Share2,
  FileCode,
  ArrowDownCircle,
  Loader2,
  Database,
  Save,
  Calendar,
  Briefcase,
} from "lucide-react";
import ResumeTemplateModal, { RESUME_TEMPLATES } from "../ResumeTemplateModal";
import ResumePreviewModal from "../ResumePreviewModal";
import InteractiveResumeCanvas from "../InteractiveResumeCanvas";
import { exportResumeToPDF } from "@/lib/pdfExporter";

export default function MyResumesView() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeResumeId, setActiveResumeId] = useState(null);

  // Modal controls
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [showPreviewDropdown, setShowPreviewDropdown] = useState(false);

  // Carousel Scroll Ref
  const carouselRef = useRef(null);

  // FETCH ALL RESUMES FROM POSTGRESQL DATABASE ON MOUNT
  useEffect(() => {
    async function fetchResumes() {
      try {
        setLoading(true);
        const res = await fetch("/api/resumes");
        const json = await res.json();

        const todayStr = new Date().toISOString().split("T")[0];

        if (json.success && Array.isArray(json.resumes) && json.resumes.length > 0) {
          const formatted = json.resumes.map((r) => ({
            ...r,
            createdDate: r.createdDate || r.date || todayStr,
            updatedDate: r.updatedDate || r.date || todayStr,
            title: r.data?.roleTitle || r.title || "Software Engineer Resume",
          }));
          setResumes(formatted);
          setActiveResumeId(formatted[0].id);
        } else {
          // Default empty state - 0 resumes by default for every user
          setResumes([]);
          setActiveResumeId(null);
        }
      } catch (err) {
        console.error("Failed to load resumes from DB:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, []);

  const activeResume =
    resumes.find((r) => String(r.id) === String(activeResumeId)) || resumes[0] || null;

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // PERSIST UPDATES TO POSTGRESQL DATABASE (Syncs Job Title & Updated Date)
  const handleUpdateActiveResume = async (updatedData) => {
    if (!activeResume) return;

    const todayStr = new Date().toISOString().split("T")[0];
    const syncedTitle = updatedData.roleTitle
      ? updatedData.roleTitle
      : activeResume.title;

    const updatedResumeObj = {
      ...activeResume,
      title: syncedTitle,
      tag: updatedData.roleTitle ? updatedData.roleTitle.split(" ")[0] : activeResume.tag,
      updatedDate: todayStr,
      data: updatedData,
    };

    setResumes((prev) =>
      prev.map((r) =>
        String(r.id) === String(activeResumeId) ? updatedResumeObj : r
      )
    );

    // Save to PostgreSQL via API
    try {
      setIsSaving(true);
      await fetch(`/api/resumes/${activeResumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedResumeObj),
      });
    } catch (err) {
      console.error("Failed to persist update to PostgreSQL:", err);
    } finally {
      setTimeout(() => setIsSaving(false), 400);
    }
  };

  // CHANGE TEMPLATE AND PERSIST TO POSTGRESQL DATABASE
  const handleSelectTemplate = async (templateId) => {
    if (!activeResume) return;

    const todayStr = new Date().toISOString().split("T")[0];
    const updatedResumeObj = {
      ...activeResume,
      templateId,
      updatedDate: todayStr,
    };

    setResumes((prev) =>
      prev.map((r) =>
        String(r.id) === String(activeResumeId) ? updatedResumeObj : r
      )
    );

    try {
      setIsSaving(true);
      await fetch(`/api/resumes/${activeResumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedResumeObj),
      });
    } catch (err) {
      console.error("Failed to update template in DB:", err);
    } finally {
      setTimeout(() => setIsSaving(false), 400);
    }
  };

  // CREATE NEW CUSTOM RESUME IN POSTGRESQL DATABASE
  const handleCreateNewResume = async () => {
    const newId = `res_${Date.now()}`;
    const todayStr = new Date().toISOString().split("T")[0];
    const defaultJobTitle = "Fullstack Software Engineer";

    const newResumePayload = {
      id: newId,
      title: defaultJobTitle,
      tag: "Fullstack",
      createdDate: todayStr,
      updatedDate: todayStr,
      templateId: "nodejs-modern",
      data: {
        name: "Your Name",
        roleTitle: defaultJobTitle,
        avatarUrl: "",
        email: "engineer@careerbuild.io",
        phone: "+1 (555) 000-0000",
        location: "City, Country",
        summary:
          "Full Stack MERN Developer with experience in building scalable web applications using MongoDB, Express.js, React, Next.js and Node.js. Proficient in both front-end and back-end development, with a strong focus on clean code, performance, and responsive design.",
        skills: ["Node.js", "React", "TypeScript", "PostgreSQL", "MongoDB", "Express.js"],
        experiences: [
          {
            id: 1,
            role: defaultJobTitle,
            company: "Tech Enterprise",
            duration: "2024 - Present",
            description: "Built scalable web apps and backend services.",
          },
        ],
        degree: "B.S. Computer Science",
        university: "Tech University",
      },
    };

    try {
      setIsSaving(true);
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResumePayload),
      });
      const json = await res.json();

      if (json.success && json.resume) {
        const createdObj = {
          ...json.resume,
          createdDate: todayStr,
          updatedDate: todayStr,
          title: json.resume.data?.roleTitle || defaultJobTitle,
        };
        setResumes([createdObj, ...resumes]);
        setActiveResumeId(createdObj.id);
      }
    } catch (err) {
      console.error("Failed to create resume in DB:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE RESUME FROM POSTGRESQL DATABASE
  const handleDeleteResume = async (id, title, e) => {
    e.stopPropagation();

    if (confirm(`Delete resume "${title}" from database?`)) {
      try {
        setIsSaving(true);
        const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
        const json = await res.json();

        if (json.success) {
          const filtered = resumes.filter((r) => String(r.id) !== String(id));
          setResumes(filtered);
          if (filtered.length > 0) {
            if (String(activeResumeId) === String(id)) {
              setActiveResumeId(filtered[0].id);
            }
          } else {
            setActiveResumeId(null);
          }
        }
      } catch (err) {
        console.error("Failed to delete resume from DB:", err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Direct PDF export trigger (No browser print popup!)
  const handleDirectDownload = () => {
    if (!activeResume) return;
    exportResumeToPDF(
      "resume-canvas-printable",
      `${activeResume.data?.roleTitle || activeResume.title}_Resume`
    );
  };

  // Active template metadata
  const activeTemplateObj = activeResume
    ? RESUME_TEMPLATES.find((t) => t.id === activeResume.templateId) || RESUME_TEMPLATES[0]
    : RESUME_TEMPLATES[0];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-8 h-8 text-[#064e3b] animate-spin" />
        <p className="text-xs font-bold text-gray-600">Connecting to PostgreSQL Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Resume Builder</span>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-[#064e3b] border border-emerald-200 flex items-center gap-1">
              <Database className="w-3 h-3 text-[#064e3b]" />
              PostgreSQL Connected
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            All edits, job titles, created & updated dates persist directly to PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaving && (
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 animate-pulse">
              <Save className="w-3.5 h-3.5 text-emerald-600 animate-spin" /> Saving to DB...
            </span>
          )}

          <button
            onClick={handleCreateNewResume}
            className="py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </button>
        </div>
      </div>

      {/* IF 0 RESUMES: SHOW EMPTY STATE */}
      {resumes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center space-y-5 max-w-2xl mx-auto shadow-xs my-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#064e3b] border border-emerald-100 flex items-center justify-center mx-auto shadow-inner">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-gray-900">No Resumes Found</h3>
            <p className="text-sm text-gray-500 font-medium max-w-md mx-auto">
              You currently have zero saved resumes in your PostgreSQL database. Click below to create your first resume.
            </p>
          </div>
          <button
            onClick={handleCreateNewResume}
            className="py-3 px-6 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-extrabold text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Resume</span>
          </button>
        </div>
      ) : (
        <>
          {/* TOP CAROUSEL: SAVED RESUMES SHOWING JOB TITLE, CREATED & UPDATED DATES */}
          <div className="bg-white p-4 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#064e3b]" />
                <span>Saved Resumes in Database ({resumes.length})</span>
              </h2>

              {/* Carousel Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="p-1.5 rounded-xl bg-gray-100 hover:bg-[#064e3b] text-gray-600 hover:text-white transition-all cursor-pointer"
                  title="Previous Resume"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="p-1.5 rounded-xl bg-gray-100 hover:bg-[#064e3b] text-gray-600 hover:text-white transition-all cursor-pointer"
                  title="Next Resume"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 px-1"
            >
              {resumes.map((item) => {
                const isSelected = String(item.id) === String(activeResumeId);
                const jobTitleDisplay = item.data?.roleTitle || item.title || "Software Engineer";

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveResumeId(item.id)}
                    className={`min-w-[270px] sm:min-w-[300px] p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                      isSelected
                        ? "bg-emerald-50/30 border-[#064e3b] shadow-md ring-4 ring-[#064e3b]/10"
                        : "bg-white border-gray-200 hover:border-emerald-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="space-y-2">
                      {/* CARD HEADER: Job Tag + Created & Updated Dates */}
                      <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-[#064e3b] flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {item.tag || "Job Resume"}
                        </span>

                        <div className="text-[10px] text-gray-500 font-semibold text-right leading-tight space-y-0.5">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-gray-400">Created:</span>
                            <span>{item.createdDate || item.date}</span>
                          </div>
                          <div className="flex items-center justify-end gap-1 text-emerald-700">
                            <span className="text-emerald-500 font-bold">Updated:</span>
                            <span>{item.updatedDate || item.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* MAIN JOB TITLE & SUBTITLE */}
                      <div>
                        <h3 className="text-sm font-black text-gray-900 line-clamp-1 group-hover:text-[#064e3b] transition-colors">
                          {jobTitleDisplay}
                        </h3>
                        <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                          Candidate: {item.data?.name || "Rahmatullah Baheer"}
                        </p>
                      </div>
                    </div>

                    {/* Card Quick Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span
                        className={`text-[10px] font-bold ${
                          isSelected ? "text-[#064e3b]" : "text-gray-400"
                        }`}
                      >
                        {isSelected ? "● Active Editor Canvas" : "Click to select"}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveResumeId(item.id);
                            setIsPreviewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-[#064e3b] transition-all cursor-pointer"
                          title="Preview Resume"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteResume(item.id, jobTitleDisplay, e)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-rose-100 text-gray-700 hover:text-rose-600 transition-all cursor-pointer"
                          title="Delete from DB"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ACTION BUTTONS BAR */}
          {activeResume && (
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* LEFT BUTTON: "Select Template" */}
              <button
                type="button"
                onClick={() => setIsTemplateModalOpen(true)}
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-800 to-[#064e3b] hover:from-emerald-900 hover:to-[#04392b] text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Layout className="w-4 h-4 text-emerald-300" />
                <span>Select Template</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 ml-1">
                  {activeTemplateObj.name}
                </span>
              </button>

              {/* RIGHT BUTTON: DIRECT DOWNLOAD (NO PRINT POPUP!) */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDirectDownload}
                  className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-emerald-500/30"
                >
                  <Download className="w-4 h-4 text-emerald-300" />
                  <span>Direct Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          )}

          {/* MAIN CANVAS EDIT WORKSPACE */}
          {activeResume && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#064e3b]" />
                  <span>Interactive DB Editor Workspace</span>
                </h2>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Edits automatically sync Job Title, Created & Updated dates to PostgreSQL
                </span>
              </div>

              <InteractiveResumeCanvas
                key={activeResume.id}
                resumeData={activeResume.data || {}}
                onUpdateResumeData={handleUpdateActiveResume}
                templateId={activeResume.templateId}
              />
            </div>
          )}
        </>
      )}

      {/* TEMPLATE POPUP MODAL */}
      {activeResume && (
        <ResumeTemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          selectedTemplateId={activeResume.templateId}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {/* FULL PREVIEW MODAL */}
      {activeResume && (
        <ResumePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          resumeData={activeResume.data || {}}
          activeTemplate={activeTemplateObj}
        >
          <InteractiveResumeCanvas
            key={`preview_${activeResume.id}`}
            resumeData={activeResume.data || {}}
            onUpdateResumeData={() => {}}
            templateId={activeResume.templateId}
            isReadOnly={true}
          />
        </ResumePreviewModal>
      )}
    </div>
  );
}
