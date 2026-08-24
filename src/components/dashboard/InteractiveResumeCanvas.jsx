"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Edit3,
  Star,
  Briefcase,
  GraduationCap,
  Sparkles,
  Camera,
  Check,
  X,
  Code2,
  Loader2,
  CloudUpload,
} from "lucide-react";

export default function InteractiveResumeCanvas({
  resumeData,
  onUpdateResumeData,
  templateId = "nodejs-modern",
  isReadOnly = false,
}) {
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [newSkill, setNewSkill] = useState("");
  const [newExp, setNewExp] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });
  const [showAddExpModal, setShowAddExpModal] = useState(false);

  // Template accent styles helper
  const getTemplateStyle = () => {
    switch (templateId) {
      case "executive-pro":
        return {
          headerBg: "bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white",
          accentColor: "text-blue-700",
          badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
          borderAccent: "border-blue-600",
          starColor: "text-blue-600 fill-blue-600",
        };
      case "ats-[#064e3b]":
        return {
          headerBg: "bg-gray-900 text-white",
          accentColor: "text-gray-900",
          badgeBg: "bg-gray-100 text-gray-800 border-gray-300",
          borderAccent: "border-gray-800",
          starColor: "text-gray-700 fill-gray-700",
        };
      case "creative-dev":
        return {
          headerBg: "bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-800 text-white",
          accentColor: "text-purple-700",
          badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
          borderAccent: "border-purple-600",
          starColor: "text-purple-600 fill-purple-600",
        };
      case "minimalist-clean":
        return {
          headerBg: "bg-[#064e3b] text-white",
          accentColor: "text-teal-700",
          badgeBg: "bg-teal-50 text-teal-800 border-teal-200",
          borderAccent: "border-teal-600",
          starColor: "text-teal-600 fill-teal-600",
        };
      case "nodejs-modern":
      default:
        return {
          headerBg: "bg-gradient-to-r from-[#064e3b] via-emerald-800 to-teal-900 text-white",
          accentColor: "text-[#064e3b]",
          badgeBg: "bg-emerald-50 text-[#064e3b] border-emerald-200",
          borderAccent: "border-[#064e3b]",
          starColor: "text-emerald-600 fill-emerald-600",
        };
    }
  };

  const style = getTemplateStyle();

  // START EDITING FIELD (holds local state without calling API)
  const startEditing = (field, initialVal) => {
    if (isReadOnly) return;
    setEditingField(field);
    setTempValue(initialVal || "");
  };

  // COMMIT EDITING ON BLUR / OUT-CLICK (Fires DB API call ONLY ONCE when done editing)
  const commitEditing = (field) => {
    if (!editingField) return;
    const targetKey = field === "role" ? "roleTitle" : field;
    if (tempValue !== (resumeData[targetKey] || "")) {
      onUpdateResumeData({
        ...resumeData,
        [targetKey]: tempValue,
      });
    }
    setEditingField(null);
  };

  const handleFieldChange = (field, value) => {
    onUpdateResumeData({
      ...resumeData,
      [field]: value,
    });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    const updatedSkills = [...(resumeData.skills || []), newSkill.trim()];
    handleFieldChange("skills", updatedSkills);
    setNewSkill("");
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = (resumeData.skills || []).filter((_, i) => i !== index);
    handleFieldChange("skills", updatedSkills);
  };

  const handleUpdateSkill = (index, newValue) => {
    const updatedSkills = [...(resumeData.skills || [])];
    updatedSkills[index] = newValue;
    handleFieldChange("skills", updatedSkills);
  };

  const handleAddExperience = () => {
    if (!newExp.role || !newExp.company) return;
    const updatedExp = [...(resumeData.experiences || []), { ...newExp, id: Date.now() }];
    handleFieldChange("experiences", updatedExp);
    setNewExp({ role: "", company: "", duration: "", description: "" });
    setShowAddExpModal(false);
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        handleFieldChange("avatarUrl", json.url);
      } else {
        alert(json.error || "Failed to upload image to Cloudinary.");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Failed to upload image to Cloudinary. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div
      id="resume-canvas-printable"
      className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10 transition-all duration-300 min-h-[900px] text-gray-800 font-sans"
    >
      {/* HEADER SECTION - Nodejs - Name & Image Circle */}
      <div className={`p-6 rounded-2xl ${style.headerBg} shadow-md mb-8 relative group`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* IMAGE CIRCLE WITH CLOUDINARY FILE UPLOAD */}
          <div className="relative group/avatar cursor-pointer">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFileUpload}
              accept="image/*"
              className="hidden"
            />

            <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center text-white shadow-lg relative">
              {isUploadingImage ? (
                <div className="flex flex-col items-center justify-center space-y-1 bg-black/60 w-full h-full">
                  <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                  <span className="text-[9px] font-bold text-white">Cloudinary...</span>
                </div>
              ) : resumeData.avatarUrl ? (
                <img
                  src={resumeData.avatarUrl}
                  alt={resumeData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white/80" />
              )}
            </div>

            {!isReadOnly && !isUploadingImage && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-extrabold transition-opacity cursor-pointer"
                title="Upload Photo to Cloudinary"
              >
                <CloudUpload className="w-5 h-5 mb-0.5 text-emerald-300" />
                <span>Upload Img</span>
              </button>
            )}
          </div>

          {/* NAME & TARGET ROLE (Editable on blur / click out) */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            {editingField === "name" && !isReadOnly ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => commitEditing("name")}
                  onKeyDown={(e) => e.key === "Enter" && commitEditing("name")}
                  autoFocus
                  placeholder="Enter Name..."
                  className="text-2xl font-black bg-white/20 text-white rounded-lg px-3 py-1 border border-white/40 focus:outline-none w-full placeholder-white/60"
                />
                <button
                  onClick={() => commitEditing("name")}
                  className="p-1 rounded-lg bg-emerald-500 text-white cursor-pointer"
                  title="Save Name"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <h1
                onClick={() => startEditing("name", resumeData.name)}
                className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center sm:justify-start gap-2 cursor-pointer hover:opacity-90 group/name"
                title="Click to edit Name (saves on blur/out click)"
              >
                <span>{resumeData.name || "Node.js Developer"}</span>
                {!isReadOnly && (
                  <Edit3 className="w-4 h-4 opacity-0 group-hover/name:opacity-100 transition-opacity text-emerald-300" />
                )}
              </h1>
            )}

            {/* Subtitle / Role (e.g. Nodejs - Senior Engineer) */}
            {editingField === "role" && !isReadOnly ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onBlur={() => commitEditing("role")}
                  onKeyDown={(e) => e.key === "Enter" && commitEditing("role")}
                  autoFocus
                  placeholder="Enter Target Role..."
                  className="text-sm font-semibold bg-white/20 text-white rounded-lg px-3 py-1 border border-white/40 focus:outline-none w-full placeholder-white/60"
                />
                <button
                  onClick={() => commitEditing("role")}
                  className="p-1 rounded-lg bg-emerald-500 text-white cursor-pointer"
                  title="Save Role"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p
                onClick={() => startEditing("role", resumeData.roleTitle)}
                className="text-sm font-semibold text-emerald-100 flex items-center justify-center sm:justify-start gap-2 cursor-pointer hover:opacity-90 group/role"
                title="Click to edit Role Title (saves on blur/out click)"
              >
                <span>{resumeData.roleTitle || "Senior Fullstack Engineer"}</span>
                {!isReadOnly && (
                  <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover/role:opacity-100 transition-opacity text-emerald-300" />
                )}
              </p>
            )}

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-white/80 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-300" />
                {resumeData.email || "dev@careerbuild.com"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                {resumeData.phone || "+1 (555) 234-5678"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                {resumeData.location || "San Francisco, CA"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      <div className="mb-8 space-y-2">
        <h2
          className={`text-xs font-black uppercase tracking-widest ${style.accentColor} border-b-2 ${style.borderAccent} pb-1 flex items-center gap-2`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Professional Overview</span>
        </h2>
        {editingField === "summary" && !isReadOnly ? (
          <div className="space-y-2">
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => commitEditing("summary")}
              rows={3}
              autoFocus
              placeholder="Enter Professional Summary..."
              className="w-full text-xs font-medium bg-gray-50 border border-emerald-500 rounded-xl p-3 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => commitEditing("summary")}
                className="px-3 py-1 bg-[#064e3b] text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save Summary
              </button>
            </div>
          </div>
        ) : (
          <p
            onClick={() => startEditing("summary", resumeData.summary)}
            className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium cursor-pointer hover:bg-emerald-50/40 p-2 rounded-xl transition-colors group/sum relative"
            title="Click to edit summary (saves on blur/out click)"
          >
            {resumeData.summary ||
              "Experienced Fullstack & Node.js Developer specializing in building high-throughput microservices, React UI architectures, and scalable cloud applications."}
            {!isReadOnly && (
              <Edit3 className="w-3.5 h-3.5 inline ml-2 text-emerald-600 opacity-0 group-hover/sum:opacity-100 transition-opacity" />
            )}
          </p>
        )}
      </div>

      {/* SKILLS SECTION */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-1">
          <h2
            className={`text-xs font-black uppercase tracking-widest ${style.accentColor} flex items-center gap-2`}
          >
            <Code2 className="w-4 h-4" />
            <span>Technical Skills & Tech Stack</span>
          </h2>
          <span className="text-[10px] text-gray-400 font-medium">Click skill to edit/delete</span>
        </div>

        {/* Skills Chips Grid */}
        <div className="flex flex-wrap gap-2">
          {(
            resumeData.skills || [
              "Node.js",
              "React",
              "Next.js",
              "Express",
              "PostgreSQL",
              "Docker",
              "TypeScript",
              "Tailwind CSS",
            ]
          ).map((skill, idx) => (
            <div
              key={idx}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${style.badgeBg} hover:shadow-xs`}
            >
              <Star className={`w-3 h-3 ${style.starColor}`} />
              <span
                onClick={() => {
                  if (isReadOnly) return;
                  const val = prompt("Update skill:", skill);
                  if (val !== null && val.trim() !== "") handleUpdateSkill(idx, val.trim());
                }}
                className="cursor-pointer"
                title="Click to edit skill"
              >
                {skill}
              </span>

              {!isReadOnly && (
                <button
                  onClick={() => handleDeleteSkill(idx)}
                  className="opacity-40 group-hover:opacity-100 hover:text-rose-600 transition-opacity p-0.5 ml-1 cursor-pointer"
                  title="Delete skill"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          {/* Add Skill Input */}
          {!isReadOnly && (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                placeholder="Add skill..."
                className="h-7 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 w-28"
              />
              <button
                onClick={handleAddSkill}
                className="h-7 px-2.5 rounded-xl bg-[#064e3b] text-white hover:bg-[#04392b] text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                title="Add Skill"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* WORK EXPERIENCE SECTION */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-gray-200 pb-1">
          <h2
            className={`text-xs font-black uppercase tracking-widest ${style.accentColor} flex items-center gap-2`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work Experience</span>
          </h2>

          {!isReadOnly && (
            <button
              onClick={() => setShowAddExpModal(true)}
              className="text-xs font-bold text-[#064e3b] hover:text-[#04392b] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Experience
            </button>
          )}
        </div>

        {/* Experience List Items */}
        <div className="space-y-4">
          {(
            resumeData.experiences || [
              {
                id: 1,
                role: "Senior Node.js & React Architect",
                company: "Tech Corp International",
                duration: "2023 - Present",
                description:
                  "Architected high-scale REST & GraphQL APIs handling 50k+ daily users. Improved database query performance by 40%.",
              },
              {
                id: 2,
                role: "Full Stack Engineer",
                company: "NextGen Software Labs",
                duration: "2021 - 2023",
                description:
                  "Designed dynamic client dashboards using React, Redux, and Node.js microservices. Integrated OAuth2 authentication.",
              },
            ]
          ).map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 bg-gray-50/50 transition-all space-y-1.5 relative group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                  <Star className={`w-3.5 h-3.5 ${style.starColor}`} />
                  <span>{exp.role}</span>
                  <span className="text-xs text-gray-400 font-semibold">• {exp.company}</span>
                </h3>
                <span className="text-xs font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-md border border-gray-200 w-fit">
                  {exp.duration}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-medium pl-5">
                {exp.description}
              </p>

              {!isReadOnly && (
                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition-opacity p-1 cursor-pointer"
                  title="Delete experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION & CERTIFICATIONS */}
      <div className="space-y-3">
        <h2
          className={`text-xs font-black uppercase tracking-widest ${style.accentColor} border-b-2 ${style.borderAccent} pb-1 flex items-center gap-2`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education & Credentials</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <h4 className="text-xs font-bold text-gray-900">
              {resumeData.degree || "B.S. in Computer Science & Software Engineering"}
            </h4>
            <p className="text-[11px] text-gray-500 font-medium">
              {resumeData.university || "State Tech University"}
            </p>
          </div>
          <span className="text-xs font-bold text-gray-500">2018 - 2022</span>
        </div>
      </div>

      {/* MODAL TO ADD EXPERIENCE ITEM */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Add Work Experience</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Node.js Developer"
                  value={newExp.role}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tech Corp"
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 2022 - Present"
                  value={newExp.duration}
                  onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Key responsibilities & accomplishments..."
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddExpModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExperience}
                className="px-4 py-2 rounded-xl bg-[#064e3b] text-white text-xs font-bold hover:bg-[#04392b] cursor-pointer"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
