"use client";

import React from "react";
import { Video } from "lucide-react";

export default function RemindersCard({
  reminder = {
    title: "Resume Review & Interview Prep",
    time: "Time : 02.00 pm - 04.00 pm",
  },
}) {
  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <h3 className="text-sm font-bold text-gray-900 tracking-wide mb-4">
          Reminders
        </h3>

        {/* Meeting Content */}
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-extrabold text-[#064e3b] leading-snug">
            {reminder.title}
          </h4>
          <p className="text-xs text-gray-400 font-medium">{reminder.time}</p>
        </div>
      </div>

      {/* Start Meeting CTA Button */}
      <div className="mt-6">
        <button
          onClick={() => alert("Starting review session...")}
          className="w-full py-3 px-4 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <Video className="w-4 h-4 text-emerald-200 fill-emerald-200/20" />
          <span>Start Session</span>
        </button>
      </div>
    </div>
  );
}
