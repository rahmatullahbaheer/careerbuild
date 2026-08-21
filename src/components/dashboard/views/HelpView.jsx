"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageSquare, Send, BookOpen, Check } from "lucide-react";

export default function HelpView() {
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "How does the ATS Resume Optimizer work?",
      a: "Our ATS parser scans your resume structure against industry standard Applicant Tracking Systems (Workday, Greenhouse, Lever). It detects formatting errors, missing keywords, and readability issues to boost your interview callbacks.",
    },
    {
      q: "Can I export my resume to PDF and DOCX?",
      a: "Yes! All created resumes and cover letters can be exported instantly to PDF, DOCX, or plain text formats with clean typography.",
    },
    {
      q: "How do I share my resume with a reviewer or mentor?",
      a: "Navigate to the Review Team tab, click 'Invite Reviewer', and enter their email address. They will receive a secure feedback link to leave comments on your resume.",
    },
    {
      q: "Is my personal data kept private?",
      a: "Absolute security is guaranteed. Your personal details, contact info, and resume contents are encrypted and never shared with third parties.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
          Help Desk & Support Center
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Find quick answers, read user guides, or get in touch with our career support team.
        </p>
      </div>

      {/* FAQs Section */}
      <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#064e3b]" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200/70 rounded-xl overflow-hidden bg-gray-50/50"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-3.5 text-left flex items-center justify-between font-bold text-xs text-gray-800 hover:bg-gray-100/70 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-3.5 pt-0 text-xs text-gray-600 leading-relaxed font-medium bg-white border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Contact Form */}
      <div className="bg-white border border-gray-100/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#064e3b]" />
          <span>Need Extra Help? Contact Support</span>
        </h3>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
            Thank you! Your message has been sent to our support team. We will reply within 2 hours.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-3"
          >
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. ATS Scanner question..."
                className="w-full h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Message</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your issue or question..."
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-bold text-xs transition-all shadow-xs flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
