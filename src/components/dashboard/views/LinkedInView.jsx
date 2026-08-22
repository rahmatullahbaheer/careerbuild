"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  TrendingUp,
  Eye,
  Search,
  Zap,
  ArrowRight,
  Share2,
  FileDown,
  FileUp,
  AlertCircle,
  Award,
  MessageSquare,
  Send,
  UserCheck,
  Image as ImageIcon,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  Sliders,
  ChevronRight
} from "lucide-react";
import Linkedin from "../../icons/LinkedinIcon";

import { useUser } from "@/context/UserContext";

export default function LinkedInView() {
  const { user } = useUser();
  const userName = user?.name || "Alexander Wright";
  const userJobTitle = user?.jobTitle || "Senior Software Engineer";

  const [activeTab, setActiveTab] = useState("enhancer"); // 'enhancer' | 'keywords' | 'posts' | 'outreach'
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  
  // Interactive Headline Generator state
  const [selectedHeadlineStyle, setSelectedHeadlineStyle] = useState("Impact-Driven");
  const [customRole, setCustomRole] = useState(userJobTitle);

  // Post Assistant state
  const [postType, setPostType] = useState("job_seeking");
  const [customPostNote, setCustomPostNote] = useState("");

  const handleCopy = (text, fieldId) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  // Dynamic Headline Options based on customRole input
  const headlineTemplates = {
    "Impact-Driven": `${customRole} | React & Next.js Expert | Scaled SaaS Apps to 500k+ MAU | Ex-Tech Lead`,
    "SEO & Recruiter Focused": `${customRole} | Full Stack Developer | Node.js, TypeScript, Cloud Architecture & System Design`,
    "Value Proposition": `Helping companies build high-performance web products as a ${customRole} | UI/UX & Clean Code Advocate`,
    "Executive Leadership": `${customRole} & Engineering Mentor | Driving Digital Transformation & Scalable Cloud Solutions`,
  };

  // AI Post Templates
  const postTemplates = {
    job_seeking: `🚀 I'm actively looking for new opportunities!

With 6+ years of experience as a ${customRole}, I specialize in building modern, high-performance web applications with React, Next.js, TypeScript, and Node.js.

Key highlights of my recent work:
• Architected scalable frontend systems serving 500k+ monthly active users.
• Reduced page load times by 45% through advanced SSR and bundle optimization.
• Mentored 8+ junior/mid-level engineers and established high code quality standards.

I'm open to full-time remote or hybrid positions. If your team is hiring or if you know of any open roles, I'd love to connect!

#OpenToWork #SoftwareEngineering #ReactJS #WebDevelopment #JobSearch #TechCareers`,

    project_launch: `✨ Excited to showcase my latest project: CareerBuild AI Platform!

I've been working on an all-in-one career management suite designed to help job seekers optimize their resumes, ATS pass rates, and LinkedIn profile keywords for top recruiters.

Key features built:
⚡ Next.js 16 App Router & React 19
🎨 Custom Tailwind CSS & Framer Motion UI
🤖 Automated ATS & Recruiter Keyword Analysis

Check out the live demo and let me know your thoughts in the comments! 👇

#Nextjs #React #WebDev #BuildInPublic #SoftwareEngineering #TypeScript`,

    networking: `💡 Key lesson from scaling web apps: Performance isn't just a technical metric, it's a core user experience feature.

In my recent projects as a ${customRole}, optimizing initial render times and API responses directly improved user retention by 28%.

What optimization techniques have had the biggest impact in your web application stack? Would love to hear thoughts from fellow engineers!

#WebDevelopment #SoftwareEngineering #Frontend #ReactJS #SystemDesign`
  };

  // Outreach Templates
  const outreachTemplates = [
    {
      id: "recruiter_dm",
      title: "Direct Recruiter Outreach",
      description: "Send to internal recruiters who posted a relevant job opening.",
      message: `Hi [Recruiter Name],\n\nI noticed you're recruiting for [Job Title] roles at [Company Name].\n\nWith my background as a ${customRole} (React, Node, Next.js) and proven track record of scaling high-traffic web applications, I believe my skill set aligns closely with what your engineering team is looking for.\n\nI'd welcome a quick 10-minute chat to discuss how I can contribute to [Company Name]. Here is my portfolio/resume link!\n\nBest regards,\n${userName}`
    },
    {
      id: "eng_manager",
      title: "Engineering Manager Connection",
      description: "Connect with tech leads and engineering directors directly.",
      message: `Hi [Manager Name],\n\nI've been following [Company Name]'s tech engineering updates and love your recent work on [Project/Feature Name].\n\nAs a ${customRole} with deep expertise in scalable React architecture and cloud systems, I'm super interested in upcoming opportunities on your team.\n\nWould love to connect and keep in touch as your engineering team grows!\n\nBest,\n${userName}`
    },
    {
      id: "referral_request",
      title: "Employee Referral Request",
      description: "Ask a peer or second-degree connection for a referral.",
      message: `Hi [Name],\n\nHope you're having a great week! I saw an opening for [Job Title] at [Company Name] and noticed you work there.\n\nI'm currently applying for the role and would be immensely grateful if you'd be open to submitting a quick internal referral. My background includes 6+ years as a ${customRole} building high-impact web products.\n\nHappy to share my resume or hop on a quick call if helpful!\n\nThanks so much,\n${userName}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Account Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a66c2] via-[#084e96] to-[#043366] text-white p-6 sm:p-7 shadow-lg"
      >
        {/* Background Decorative Grid */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Linkedin className="w-64 h-64 text-white -mr-10 -mt-10" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                <Linkedin className="w-3.5 h-3.5 text-sky-200" />
                LinkedIn Direct Integration
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Synced & Active
              </span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"}
                  alt={userName}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#0a66c2] rounded-full ring-2 ring-white flex items-center justify-center text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-sky-400 text-[#0a66c2]" />
                </div>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  {userName}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-200 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h1>
                <p className="text-xs sm:text-sm text-sky-100/90 font-medium line-clamp-1">
                  Senior Full-Stack Engineer | React, Next.js, Node.js & Cloud Architect
                </p>
                <p className="text-[11px] text-sky-200/70 mt-0.5">
                  linkedin.com/in/totok-michael • Last synced 2 mins ago
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="flex-1 lg:flex-none py-2.5 px-4 rounded-xl bg-white text-[#0a66c2] hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Re-sync Profile"}</span>
            </button>

            <button
              onClick={() => alert("LinkedIn Data successfully imported into your Resume Builder!")}
              className="flex-1 lg:flex-none py-2.5 px-4 rounded-xl bg-sky-500/30 hover:bg-sky-500/40 text-white font-bold text-xs sm:text-sm transition-all border border-sky-300/30 backdrop-blur-md flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Import to Resume</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Top 4 Performance & Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Profile Health Score
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">94</span>
            <span className="text-xs font-bold text-emerald-600">/100 (All-Star)</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Top 5% profile completeness in Software Engineering.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Recruiter Views
            </span>
            <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">1,420</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +42%
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            48 tech recruiters viewed your profile this week.
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Search Appearances
            </span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Search className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900 font-mono">3,850</span>
            <span className="text-xs font-bold text-emerald-600">This Month</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Appeared in searches for "Senior Full Stack", "Next.js Lead".
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Keyword Alignment
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#064e3b] font-mono">96%</span>
            <span className="text-xs font-bold text-emerald-600">Matched</span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium">
            Synced with your active Resume & Cover Letter keywords.
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "enhancer", label: "AI Headline & Bio Enhancer", icon: Sparkles },
          { id: "keywords", label: "Recruiter Keyword Audit", icon: Zap },
          { id: "posts", label: "LinkedIn Post Assistant", icon: Share2 },
          { id: "outreach", label: "Cold DM Templates", icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0a66c2] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: AI Headline & Bio Enhancer */}
      {activeTab === "enhancer" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Target Role Input & Style Switcher */}
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0a66c2]" />
                  AI LinkedIn Headline Generator
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Optimize your headline to get 4x more recruiter views on LinkedIn.
                </p>
              </div>

              {/* Role Input */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Target Role:</span>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/30 w-full sm:w-64"
                  placeholder="e.g. Senior Full-Stack Engineer"
                />
              </div>
            </div>

            {/* Headline Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {Object.entries(headlineTemplates).map(([styleName, headlineText]) => {
                const isSelected = selectedHeadlineStyle === styleName;
                const isCopied = copiedField === styleName;

                return (
                  <div
                    key={styleName}
                    onClick={() => setSelectedHeadlineStyle(styleName)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                      isSelected
                        ? "border-[#0a66c2] bg-sky-50/40 ring-1 ring-[#0a66c2]/30"
                        : "border-gray-200/80 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0a66c2]">
                          {styleName}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded bg-[#0a66c2] text-white text-[10px] font-bold">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-800 leading-relaxed font-sans">
                        "{headlineText}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 font-medium">
                        {headlineText.length} / 220 chars
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(headlineText, styleName);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-gray-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Bio & Summary Generator */}
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#064e3b]" />
                  LinkedIn "About" Summary Generator
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  High-converting LinkedIn bio crafted specifically for {customRole} positions.
                </p>
              </div>
              <button
                onClick={() => handleCopy(`Passionate and impact-driven ${customRole} with 6+ years of experience constructing scalable web applications, microservices, and modern user interfaces. Proven track record in frontend architecture (React, Next.js, TypeScript) and backend microservices (Node.js, PostgreSQL). Scaled core platforms to 500k+ active monthly users while reducing loading latency by 45%.\n\nKey Expertise:\n• Frontend Architecture: React 19, Next.js, Redux, Tailwind CSS, System Design\n• Backend & Cloud: Node.js, Express, REST/GraphQL APIs, PostgreSQL, AWS\n• Leadership: Agile Mentorship, CI/CD Pipeline Automation, Technical Strategy\n\nAlways excited to connect with innovative engineering teams and tech leaders! Feel free to reach out via message or email.`, "bio_summary")}
                className="px-3 py-1.5 rounded-xl bg-[#064e3b] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#04392b] transition-all shadow-2xs"
              >
                {copiedField === "bio_summary" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Bio</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/70 text-xs text-gray-800 leading-relaxed space-y-3 font-sans">
              <p>
                Passionate and impact-driven <strong>{customRole}</strong> with 6+ years of experience constructing scalable web applications, microservices, and modern user interfaces. Proven track record in frontend architecture (React, Next.js, TypeScript) and backend microservices (Node.js, PostgreSQL). Scaled core platforms to 500k+ active monthly users while reducing loading latency by 45%.
              </p>
              <div>
                <strong>Key Expertise:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
                  <li><strong>Frontend Architecture:</strong> React 19, Next.js App Router, Redux Toolkit, Tailwind CSS, Framer Motion</li>
                  <li><strong>Backend & Cloud:</strong> Node.js, Express, REST/GraphQL APIs, PostgreSQL, Docker, AWS</li>
                  <li><strong>Engineering Leadership:</strong> Agile Team Mentorship, CI/CD Automation, Clean Code Code Reviews</li>
                </ul>
              </div>
              <p className="text-gray-600">
                Always excited to connect with innovative engineering teams and tech leaders! Feel free to reach out via message.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Recruiter Keyword Audit */}
      {activeTab === "keywords" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-2xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Recruiter Search Keyword Scanner
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Top keywords tech recruiters search when filtering profiles for {customRole} roles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Matched Keywords */}
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Present in Profile (12 Keywords)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
                    High Search Impact
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React.js", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "REST API", "Git", "State Management", "Microservices", "Jest", "CI/CD", "Web Vitals"].map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 text-xs font-bold shadow-2xs flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing / High Value Recommendations */}
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Recommended Additions (3 Keywords)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-600 text-white rounded">
                    +18% Search Lift
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "System Design", reason: "Searched by 74% of Senior Engineer recruiters." },
                    { name: "Docker & Containers", reason: "Increases DevOps cross-functional matches." },
                    { name: "GraphQL", reason: "Featured in 60% of modern full-stack tech specs." },
                  ].map((item) => (
                    <div key={item.name} className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-gray-900">{item.name}</div>
                        <div className="text-[10px] text-gray-500">{item.reason}</div>
                      </div>
                      <button
                        onClick={() => alert(`Added "${item.name}" suggestion to your LinkedIn skills draft!`)}
                        className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold whitespace-nowrap transition-colors"
                      >
                        Add to Profile
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: LinkedIn Post Assistant */}
      {activeTab === "posts" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-2xl shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0a66c2]" />
                  AI LinkedIn Post & Announcement Generator
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Generate engaging posts to notify your network about your job search, projects, or milestones.
                </p>
              </div>

              {/* Post Type Selector */}
              <div className="flex items-center gap-2">
                {[
                  { id: "job_seeking", label: "#OpenToWork" },
                  { id: "project_launch", label: "Project Launch" },
                  { id: "networking", label: "Tech Insight" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      postType === type.id
                        ? "bg-[#0a66c2] text-white shadow-2xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Post Box */}
            <div className="relative space-y-3">
              <textarea
                value={postTemplates[postType]}
                readOnly
                rows={11}
                className="w-full p-4 rounded-xl border border-gray-200/90 bg-gray-50 text-xs text-gray-800 font-mono leading-relaxed focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium">
                  Ready to publish on LinkedIn
                </span>
                <button
                  onClick={() => handleCopy(postTemplates[postType], "post_content")}
                  className="px-4 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                >
                  {copiedField === "post_content" ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Post!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Post to Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 4: Cold DM Templates */}
      {activeTab === "outreach" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4">
            {outreachTemplates.map((tpl) => {
              const isCopied = copiedField === tpl.id;
              return (
                <div
                  key={tpl.id}
                  className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#064e3b]" />
                        {tpl.title}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">{tpl.description}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(tpl.message, tpl.id)}
                      className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60 font-mono text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {tpl.message}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
